import {
  getDataFromCache,
  getDatabaseQuery,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
// import isEqual from 'lodash/isEqual'
// import uniqWith from 'lodash/uniqWith'
import type { Metadata } from 'next'

import { getPropertyTypeData } from 'next-notion/utils'

import type { PageObjectResponseEvent } from '~app/(notion)/_config'

import { CONFIG, getEventData, getPageData } from '~app/(notion)/_config'
import { generateMetadataCustom } from '~app/(notion)/_config/temp/generateMetadataCustom'

import { Listing } from './_components/Event.Listing'
import { Slug } from './_components/Event.Slug'

const isDev = process.env.NODE_ENV === 'development'

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.MINUTE
// export const runtime = 'nodejs'

const { DATABASE_ID, SEGMENT } = CONFIG.EVENTS

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: segmentInfo.isIndex ? '' : DATABASE_ID,
    filterType: 'equals',
    segmentInfo,
  })

  const pageData = segmentInfo.isIndex
    ? getPageData(data?.page?.properties)
    : getEventData(data?.page?.properties)
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })
  return seo
}

async function _generateStaticParams({ ...props }) {
  // @todo(types)
  const segments: any = [{ catchAll: [] }]
  const combos: any = []

  console.dir(`> generateStaticParams (${SEGMENT})`)
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  // const data = await getDataFromCache({
  //   database_id: '',
  //   filterType: 'equals',
  //   segmentInfo,
  // })
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
    dataStatic.results.map((item: PageObjectResponseEvent) => {
      const { properties } = item
      const { isPublished } = getEventData(properties)
      if (!isPublished) return
      // const propertyTypeData: any = getPropertyTypeData(properties, 'Slug.Preview')
      // const href = propertyTypeData?.string.replaceAll(`/${SEGMENT}/`, '')
      const href = getPropertyTypeData(properties, 'Slug.Preview')?.replaceAll(
        `/${SEGMENT}/`,
        '',
      )
      const catchAll = href.split('/')

      /**
       * @todo(next) build/cache this gets kind of in-depth
       */
      const isEvent = segmentInfo.segment === 'events' // && !segmentInfo.isIndex
      if (isEvent) {
        if (catchAll[0] !== 2023) return null
      }

      segments.push({ catchAll })
      if (catchAll.length > 0) {
        for (let index = 0; index < catchAll.length; index++) {
          const element = catchAll.slice(0, index)
          element.length > 0 && combos.push({ catchAll: element })
        }
      }
      return
    })
  }
  // const routes = !!combos && uniqWith(combos, isEqual)
  // !!routes && console.dir(`routes: turned off`)
  // !!routes && console.dir(routes)
  // !!routes && routes.map((route) => segments.push(route))

  // console.dir(segments)

  return segments
}
const generateStaticParams = isDev ? undefined : _generateStaticParams
export { generateStaticParams }

export default function Page({ revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  if (segmentInfo.isIndex) {
    return <Listing revalidate={revalidate} segmentInfo={segmentInfo} />
  }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
