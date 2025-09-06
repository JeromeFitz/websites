import 'server-only'

/**
 * @note(next|redis) try to avoid breaking changes but if necessary
 *  run a build with:
 *  -  OVERRIDE_CACHE=true pnpm turbo run build --filter="..."
 */

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Client } from '@notionhq/client'
// import type { FilterType } from 'next-notion/Notion.types'
import { getBlockChildrenDataParent } from 'next-notion/queries/index'
import { isAwsImage, isImageExpired } from 'next-notion/utils/index'
import { cache } from 'react'

import { getCache, setCache } from '../../redis/index'
import { getDatabaseQuery, getMetadata } from './index'

// @todo(types) next-notion
// import type { SegmentInfo } from './index'

const notion = new Client({ auth: envServer.NOTION_API_KEY })

interface GetDataFromCache {
  database_id: string
  draft?: boolean
  filterType: any //FilterType
  revalidate?: boolean
  // @todo(types) next-notion
  segmentInfo: any //SegmentInfo
}

export const preload = ({
  database_id,
  draft,
  filterType,
  revalidate,
  segmentInfo,
}: GetDataFromCache) => {
  void getDataFromCache({
    database_id,
    draft,
    filterType,
    revalidate,
    segmentInfo,
  })
}

const getDataFromCache = cache(
  async ({
    database_id,
    draft,
    filterType,
    revalidate,
    segmentInfo,
    // todo(complexity) 21
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
  }: GetDataFromCache) => {
    const { slug } = segmentInfo
    /**
     * Redis
     */
    let data
    // console.dir(`getCache: slug: ${slug}`)
    const databaseQueryCache = await getCache({ slug })
    const isCached = !!databaseQueryCache && !isObjectEmpty(databaseQueryCache)
    data = databaseQueryCache

    if (envClient.OVERRIDE_CACHE || draft || revalidate || !isCached) {
      // console.dir(
      //   `getDataFromCache: envClient.OVERRIDE_CACHE || draft || revalidate || !isCached`
      // )
      /**
       * Notion
       */
      const databaseQueryNotion = await getDatabaseQuery({
        database_id,
        draft,
        filterType,
        revalidate,
        segmentInfo,
      })
      data = databaseQueryNotion
      const page = data.results[0]

      let blocks = {}
      if (page) {
        const blockChildrenParentData = getBlockChildrenDataParent(page?.id)
        const [blockChildrenParent] = await Promise.all([blockChildrenParentData])
        blocks = blockChildrenParent
      }

      // @todo(next) but not a 404 empty please
      /**
       * @todo(notion) FALLBACK DATA FROM: Relation.Shows.Primary
       * - [x] NotionContent
       * - [ ] SEO Information
       */
      const seo = getMetadata({ properties: page?.properties || {}, segmentInfo })
      data = {
        blocks,
        page,
        seo,
      }
      if (!isObjectEmpty(data.blocks) && !draft) {
        // console.dir(`setCache: draft: ${draft ? 'y' : 'n'}`)
        void setCache({ data, slug })
      }
    }

    /**
     * Custom Check:
     * - If SEO Image is AWS, re-set cache
     */
    let isExpired = false
    const blockSeoImage = data?.page?.properties['SEO.Image']?.files[0]
    const SEO_IMAGE_IS_AWS = blockSeoImage
      ? isAwsImage(blockSeoImage[blockSeoImage?.type]?.url)
      : false
    if (SEO_IMAGE_IS_AWS) {
      isExpired = isImageExpired({
        expiry_time:
          blockSeoImage?.type === 'external'
            ? null
            : blockSeoImage[blockSeoImage?.type]?.expiry_time,
        src: blockSeoImage[blockSeoImage.type].url,
      })
    }
    /**
     * @todo(notion) determine page id a bit better as it can be Listing or Slug
     */
    if (
      !!data?.page?.id &&
      (isExpired || isObjectEmpty(data?.seo ? data?.seo : {}))
    ) {
      // @todo(types)
      const pageData: any = await notion?.pages?.retrieve({
        page_id: data?.page?.id,
      })
      const pageSeo = getMetadata({
        properties: pageData?.properties,
        segmentInfo,
      })
      data = {
        ...data,
        page: pageData,
        seo: pageSeo,
      }
      if (!isObjectEmpty(data.blocks) && !draft) {
        // console.dir(`setCache: draft: ${draft ? 'y' : 'n'}`)
        void setCache({ data, slug })
      }
    }
    /**
     * 404
     */
    return data
  },
)

export { getDataFromCache }
