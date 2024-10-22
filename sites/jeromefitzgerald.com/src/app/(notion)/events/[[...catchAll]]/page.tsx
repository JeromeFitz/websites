import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDatabaseQuery,
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
import type { Metadata } from 'next'

// import isEqual from 'lodash/isEqual.js'
// import uniqWith from 'lodash/uniqWith.js'
import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PageObjectResponseEvent } from '@/app/(notion)/_config/index'

import { CONFIG, getEventData, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
// import { Layout } from '@/components/Layout/index'

import { Listing } from './_components/Event.Listing'
import { Slug } from './_components/Event.Slug'

const CURRENT_YEAR = 2024

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.MINUTE
// export const runtime = 'nodejs'

const { DATABASE_ID, SEGMENT } = CONFIG.EVENTS

export async function generateMetadata({ params }): Promise<Metadata> {
  const { catchAll } = await params
  const segmentInfo = getSegmentInfo({
    params: { catchAll },
    SEGMENT,
  })
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

async function _generateStaticParams({ params }) {
  // @todo(types)
  const segments: any = [{ catchAll: [] }]
  const combos: any = []

  console.dir(`> generateStaticParams (${SEGMENT})`)
  const { catchAll } = await params
  const segmentInfo = getSegmentInfo({
    params: { catchAll },
    SEGMENT,
  })
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
        const isCurrentYear =
          catchAll[0] === CURRENT_YEAR || catchAll[0] === `${CURRENT_YEAR}`
        // console.dir(`---`)
        // console.dir(`catchAll[0]:   ${catchAll[0]}`)
        // console.dir(`isCurrentYear: ${isCurrentYear ? 'y' : 'n'}`)
        if (!isCurrentYear) return null
      }

      segments.push({ catchAll })
      if (catchAll.length > 0) {
        for (let index = 0; index < catchAll.length; index++) {
          const element = catchAll.slice(0, index)
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          element.length > 0 && combos.push({ catchAll: element })
        }
      }
      return
    })
  }
  /**
   * @todo(next-notion) This needs to return but for some reason
   *  the year/month/day indexes are not working anymore :X :X :X
   */
  // const routes = !!combos && uniqWith(combos, isEqual)
  // !!routes && console.dir(`routes: turned off`)
  // !!routes && console.dir(routes)
  // !!routes && routes.map((route) => segments.push(route))

  // console.dir(`[combos]`)
  // console.dir(combos)
  // console.dir(`[segments]`)
  // console.dir(segments)

  return segments
}
const generateStaticParams = env.IS_DEV ? undefined : _generateStaticParams
export { generateStaticParams }

export default async function Page(props) {
  const revalidate = props?.revalidate || false
  const { params } = props
  const { catchAll } = await params
  const segmentInfo = getSegmentInfo({
    params: { catchAll },
    revalidate,
    SEGMENT,
  })

  if (segmentInfo.isIndex) {
    return <Listing revalidate={revalidate} segmentInfo={segmentInfo} />
  }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
