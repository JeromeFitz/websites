import {
  getDataFromCache,
  getSegmentInfo,
  getDatabaseQuery,
} from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
// import isEqual from 'lodash/isEqual'
// import uniqWith from 'lodash/uniqWith'
import type { Metadata } from 'next'
import { getPropertyTypeData } from 'next-notion/utils'

import type { PageObjectResponseShow } from '~app/(notion)/_config'
import { CONFIG, getPageData, getShowData } from '~app/(notion)/_config'
import { generateMetadataCustom } from '~app/(notion)/_config/temp/generateMetadataCustom'

import { Listing } from './_components/Show.Listing.js'
import { Slug } from './_components/Show.Slug.js'

const isDev = process.env.NODE_ENV === 'development'

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.HOUR
// export const runtime = 'nodejs'

const { DATABASE_ID, SEGMENT } = CONFIG.SHOWS

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: segmentInfo.isIndex ? '' : DATABASE_ID,
    filterType: 'equals',
    segmentInfo,
  })

  const is404 = isObjectEmpty(data?.blocks || {})
  const is404Seo = {
    title: `404 | ${segmentInfo?.segment} | ${process.env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const isPublished =
    getPropertyTypeData(data?.page?.properties, 'Is.Published') || false

  const pageData = segmentInfo.isIndex
    ? getPageData(data?.page?.properties)
    : getShowData(data?.page?.properties)
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return isPublished ? seo : is404Seo
}

async function _generateStaticParams({ ...props }) {
  if (isDev) {
    return []
  }
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
    dataStatic.results.map((item: PageObjectResponseShow) => {
      const { properties } = item
      const { isPublished } = getShowData(properties)
      if (!isPublished) return
      // const propertyTypeData: any = getPropertyTypeData(properties, 'Slug.Preview')
      // const href = propertyTypeData?.string.replaceAll(`/${SEGMENT}/`, '')
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
    })
  }
  // const routes = !!combos && uniqWith(combos, isEqual)
  // !!routes && console.dir(`routes: turned off for now`)
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
