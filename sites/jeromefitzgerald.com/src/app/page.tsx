/**
 * @note(next) Custom Homepage
 */
import { isObjectEmpty } from '@jeromefitz/utils'
// import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'

import { getDataFromCache } from '~app/(cache)'
import { CONSTANTS } from '~app/(notion)/(config)/constants'
import {
  getSegmentInfo,
  getPropertyTypeData,
  getPageData,
  // getShowData,
} from '~app/(notion)/(config)/utils'
import { Notion as Blocks } from '~components/Notion'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

const { SEGMENT } = CONSTANTS.PAGES

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: '',
    filterType: 'equals',
    // preview,
    // revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug: '/homepage',
    },
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

async function Slug({ preview, revalidate, segmentInfo }) {
  // console.dir(segmentInfo)
  // const data: QueryDatabaseResponse = await getDatabaseQuery({
  //   database_id: DATABASE_ID,
  //   filterType: 'starts_with',
  //   segmentInfo: {
  //     ...segmentInfo,
  //     slug: '/homepage',
  //   },
  // })
  const data = await getDataFromCache({
    database_id: '',
    filterType: 'equals',
    preview,
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug: '/homepage',
    },
  })

  const title = 'Jerome Fitzgerald (he/him)'

  // console.dir(`showData`)
  // console.dir(showData)
  // console.dir(`data`)
  // console.dir(data)

  const { seoDescription } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  return (
    <>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent className="">{seoDescription}</SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
      <Testing />
    </>
  )
}

export default function Page({ preview = false, revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  // if (segmentInfo.isIndex) {
  //   return <Listing segmentInfo={segmentInfo} />
  // }
  return <Slug preview={preview} revalidate={revalidate} segmentInfo={segmentInfo} />
}
