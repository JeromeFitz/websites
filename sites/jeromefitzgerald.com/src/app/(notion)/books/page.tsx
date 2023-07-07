/**
 * @note(next) Custom Homepage
 */
import { isObjectEmpty } from '@jeromefitz/utils'
// import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { draftMode } from 'next/headers'

import { getDataFromCache } from '~app/(cache)'
import { CONSTANTS } from '~app/(notion)/(config)/constants'
import { getPageData } from '~app/(notion)/(config)/segments'
import { getSegmentInfo } from '~app/(notion)/(config)/utils'
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

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // console.dir(segmentInfo)
  // const data: QueryDatabaseResponse = await getDatabaseQuery({
  //   database_id: DATABASE_ID,
  //   draft: isEnabled,
  //   filterType: 'starts_with',
  //   revalidate,
  //   segmentInfo: {
  //     ...segmentInfo,
  //     slug: '/homepage',
  //   },
  // })
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug: '/books',
    },
  })

  const title = 'Books'

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
          This page has not been migrated yet.
          {/* <Blocks data={data?.blocks} /> */}
        </SectionContent>
      </SectionWrapper>
      <Testing />
    </>
  )
}

export default function Page({ revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  // if (segmentInfo.isIndex) {
  //   return <Listing srevalidate={revalidate} egmentInfo={segmentInfo} />
  // }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
