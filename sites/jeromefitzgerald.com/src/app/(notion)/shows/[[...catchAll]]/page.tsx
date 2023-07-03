import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'
import type { Metadata } from 'next'

import { getCustom } from '~app/(cache)/getCustom'
// import { TIME } from '~app/(notion)/(utils)/Notion.constants'
import { getDatabaseQuery } from '~app/(notion)/(utils)/queries/index'
import {
  getSegmentInfo,
  getPropertyTypeData,
  getShowData,
} from '~app/(notion)/(utils)/utils'

import { DATABASE_ID, SEGMENT } from './Show.constants'
import { Listing } from './Show.Listing'
import { Slug } from './Show.Slug'
import type { PageObjectResponseShow } from './Show.types'

const isDev = process.env.NODE_ENV === 'development'

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.HOUR
// export const runtime = 'nodejs'

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getCustom({
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

  return isPublished ? data?.seo : is404Seo
}

// const mockStaticParamsTest = [
//   { catchAll: ['jerome-and'] },
//   { catchAll: ['knights-of-the-arcade'] },
//   { catchAll: ['the-playlist'] },
//   { catchAll: ['warp-zone'] },
// ]

// export function generateStaticParams() {
//   console.dir(`> generateStaticParams`)
//   console.dir(mockStaticParamsTest)
//   return mockStaticParamsTest
// }

async function _generateStaticParams({ ...props }) {
  if (isDev) {
    return []
  }
  // @todo(types)
  const segments: any = [{ catchAll: [] }]
  const combos: any = []

  console.dir(`> generateStaticParams (${SEGMENT})`)
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  // const data = await getCustom({
  //   database_id: '',
  //   filterType: 'equals',
  //   segmentInfo,
  // })
  const dataStatic: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    filterType: 'starts_with',
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
        ''
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
  const routes = !!combos && uniqWith(combos, isEqual)
  !!routes && console.dir(`routes: turned off for now`)
  !!routes && console.dir(routes)
  // !!routes && routes.map((route) => segments.push(route))

  console.dir(segments)

  return segments
}
const generateStaticParams = isDev ? undefined : _generateStaticParams
export { generateStaticParams }

export default function Page({ preview = false, revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  if (segmentInfo.isIndex) {
    return (
      <Listing preview={preview} revalidate={revalidate} segmentInfo={segmentInfo} />
    )
  }
  return <Slug preview={preview} revalidate={revalidate} segmentInfo={segmentInfo} />
}
