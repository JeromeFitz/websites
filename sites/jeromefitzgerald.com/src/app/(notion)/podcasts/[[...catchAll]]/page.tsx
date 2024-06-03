/**
 * @note(next) @note(notion)
 *
 * An interesting dilemma (if you can call it that).
 * PODCASTS have EPISODES
 * A route/segment would not be
 * - !`episodes/xyz
 * It would be:
 * - `podcasts/abc/xyz`
 *
 * Should we handle that all together, or not?
 */

// import isEqual from 'lodash/isEqual.js'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getDatabaseQuery,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
// import uniqWith from 'lodash/uniqWith.js'
import type { Metadata } from 'next'

import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PageObjectResponsePodcast } from '@/app/(notion)/_config/index'

import { CONFIG, getPageData, getPodcastData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'

import { EpisodeSlug } from './_components/Episode.Slug'
import { Listing as PodcastListing } from './_components/Podcast.Listing'
import { Slug as PodcastSlug } from './_components/Podcast.Slug'

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.HOUR
// export const runtime = 'nodejs'

const { DATABASE_ID, SEGMENT } = CONFIG.PODCASTS

// @todo(complexity) 15
// eslint-disable-next-line complexity
export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: segmentInfo.isIndex ? '' : DATABASE_ID,
    filterType: 'equals',
    segmentInfo,
  })

  const is404 = isObjectEmpty(data?.blocks || {})
  const is404Seo = {
    title: `404 | ${segmentInfo?.segment} | ${env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const isPublished =
    getPropertyTypeData(data?.page?.properties, 'Is.Published') || false

  const pageData = segmentInfo.isIndex
    ? getPageData(data?.page?.properties)
    : getPodcastData(data?.page?.properties)
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return isPublished ? seo : is404Seo
}

async function _generateStaticParams({ ...props }) {
  if (env.IS_DEV) {
    return []
  }
  // @todo(types)
  const segments: any = [{ catchAll: [] }]
  const combos: any = []

  console.dir(`> generateStaticParams (${SEGMENT})`)
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const dataStatic: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: false,
    filterType: 'starts_with',
    revalidate: false,
    segmentInfo,
  })
  const hasContent = dataStatic?.results?.length > 0

  /**
   * @note(next)   Do not pass the `SEGMENT` itself, comes from Next
   * @note(notion) Modified Slug.Preview is what we are looking for.
   */
  if (hasContent) {
    dataStatic.results.map((item: PageObjectResponsePodcast) => {
      const { properties } = item
      const { isPublished } = getPodcastData(properties)
      if (!isPublished) return
      const href = getPropertyTypeData(properties, 'Slug.Preview')?.replaceAll(
        `/${SEGMENT}/`,
        '',
      )
      const catchAll = href.split('/')
      segments.push({ catchAll })
      if (catchAll.length > 0) {
        for (let index = 0; index < catchAll.length; index++) {
          const element = catchAll.slice(0, index)
          element.length > 0 && combos.push({ catchAll: element })
        }
      }
      const { episodeSlugs, ...props } = getPodcastData(properties)
      episodeSlugs.map((slug) => {
        const href = `${props.href}/${slug}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const catchAll = href.replaceAll(`/${SEGMENT}/`, '').split('/')
        segments.push({ catchAll })
        if (catchAll.length > 0) {
          for (let index = 0; index < catchAll.length; index++) {
            const element = catchAll.slice(0, index)
            element.length > 0 && combos.push({ catchAll: element })
          }
        }
      })
    })
  }
  // const routes = !!combos && uniqWith(combos, isEqual)
  // !!routes && console.dir(`routes: turned off for now`)
  // !!routes && console.dir(routes)
  // !!routes && routes.map((route) => segments.push(route))

  // console.dir(segments)

  return segments
}
const generateStaticParams = env.IS_DEV ? undefined : _generateStaticParams
export { generateStaticParams }

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  /**
   * @hack(notion) Determiniation if this segment isa PODCAST or EPISODE
   */
  const isEpisode = segmentInfo.segmentCount === 3
  if (isEpisode) {
    return <EpisodeSlug revalidate={revalidate} segmentInfo={segmentInfo} />
  }

  if (segmentInfo.isIndex) {
    return <PodcastListing revalidate={revalidate} segmentInfo={segmentInfo} />
  }
  return <PodcastSlug revalidate={revalidate} segmentInfo={segmentInfo} />
}
