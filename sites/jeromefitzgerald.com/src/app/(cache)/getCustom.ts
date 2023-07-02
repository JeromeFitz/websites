import 'server-only'
import https from 'node:https'

import { isObjectEmpty } from '@jeromefitz/utils'
import { Client } from '@notionhq/client'
import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import { cache } from 'react'

import { TIME } from '~app/(notion)/(utils)/Notion.constants'
import type { FilterType } from '~app/(notion)/(utils)/Notion.types'
import {
  getBlockChildrenDataParent,
  getDatabaseQuery,
} from '~app/(notion)/(utils)/queries/index'
import { isAwsImage, isImageExpired, getMetadata } from '~app/(notion)/(utils)/utils'
import type { SegmentInfo } from '~app/(notion)/(utils)/utils/getSegmentInfo'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

/**
 * @note(next|redis) try to avoid breaking changes but if necessary
 *  run a build with:
 *  -  OVERRIDE_CACHE=true pnpm turbo run build --filter="..."
 */
const OVERRIDE_CACHE = process.env.OVERRIDE_CACHE || false

type RC = {
  page: PageObjectResponse
  blocks: ListBlockChildrenResponse
}

const getKeysByJoin = ({ keyData, keyJoin = '/', keyPrefix }) =>
  `${keyPrefix}/${keyData.join(keyJoin)}`.toLowerCase()

const getKeysBySlugger = ({ keyData, keyPrefix }) =>
  `${keyPrefix}/${_slug(keyData)}`.toLowerCase()

const KEY__PREFIX = process.env.NEXT_PUBLIC__SITE ?? ''

function getKey(slug: string) {
  const key = slug.includes(KEY__PREFIX) ? slug : `${KEY__PREFIX}${slug}`
  // console.dir(`> slug: ${slug}`)
  // console.dir(`> key:  ${key}`)
  return key
}

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

function setCache({ data, slug }: { data: RC; slug: string }) {
  const key = getKey(slug)
  void redis.set(key, stringify(data), {
    ex: TIME.MONTH,
  })
  return null
}

type GetCustom = {
  database_id: string
  filterType: FilterType
  segmentInfo: SegmentInfo
}

export const preload = ({ database_id, filterType, segmentInfo }: GetCustom) => {
  void getCustom({ database_id, filterType, segmentInfo })
}

const getCustom = cache(
  // eslint-disable-next-line complexity
  async ({ database_id, filterType, segmentInfo }: GetCustom) => {
    const { slug } = segmentInfo
    /**
     * Redis
     */
    let data
    const databaseQueryCache = await getCache({ slug })
    const isCached = !!databaseQueryCache && !isObjectEmpty(databaseQueryCache)
    data = databaseQueryCache

    if (OVERRIDE_CACHE || !isCached) {
      /**
       * Notion
       */
      const databaseQueryNotion = await getDatabaseQuery({
        database_id,
        filterType,
        segmentInfo,
      })
      data = databaseQueryNotion
      const page = data.results[0]

      let blocks = {}
      if (!!page) {
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
        page,
        blocks,
        seo,
      }
      if (!isObjectEmpty(data.blocks)) {
        void setCache({ data, slug })
      }
    }

    /**
     * Custom Check:
     * - If SEO Image is AWS, re-set cache
     */
    let isExpired = false
    const blockSeoImage = data?.page?.properties['SEO.Image']?.files[0]
    const SEO_IMAGE_IS_AWS = !!blockSeoImage
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
      (isExpired || isObjectEmpty(!!data?.seo ? data?.seo : {}))
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
      if (!isObjectEmpty(data.blocks)) {
        void setCache({ data, slug })
      }
    }
    /**
     * 404
     */
    return data
  }
)

export { getCache, getCustom, setCache, getKeysByJoin, getKeysBySlugger }
export type { RC }
