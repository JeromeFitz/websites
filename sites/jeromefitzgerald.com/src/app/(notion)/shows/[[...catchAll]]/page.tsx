import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDatabaseQuery,
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
import type { Metadata } from 'next'

// import isEqual from 'lodash/isEqual.js'
// import uniqWith from 'lodash/uniqWith.js'
import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PageObjectResponseShow } from '@/app/(notion)/_config/index'

import { CONFIG, getPageData, getShowData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'

import { Listing } from './_components/Show.Listing'
import { Slug } from './_components/Show.Slug'

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.HOUR
// export const runtime = 'nodejs'

const { DATABASE_ID, SEGMENT } = CONFIG.SHOWS

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

  // console.dir(`segmentInfo.isIndex: ${segmentInfo.isIndex ? 'y' : 'n'}`)

  const pageData = segmentInfo.isIndex
    ? getPageData(data?.page?.properties)
    : getShowData(data?.page?.properties)
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
  // console.dir(segmentInfo)
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
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          element.length > 0 && combos.push({ catchAll: element })
          // if (element.length > 1) {
          //   console.dir(`---`)
          //   console.dir(`SEGMENT:        ${SEGMENT}`)
          //   console.dir(`element.length: ${element.length}`)
          //   console.dir(element)
          //   console.dir(`---`)
          //   combos.push({ catchAll: element })
          // }
        }
      }
      return
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
  const segmentInfo = getSegmentInfo({ SEGMENT, /* @next-codemod-error 'props' is used with spread syntax (...). Any asynchronous properties of 'props' must be awaited when accessed. */
  ...props })

  if (segmentInfo.isIndex) {
    return <Listing revalidate={revalidate} segmentInfo={segmentInfo} />
  }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
