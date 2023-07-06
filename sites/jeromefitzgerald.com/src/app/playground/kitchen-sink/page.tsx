/**
 * @note(next) Custom Homepage
 */
import { isObjectEmpty } from '@jeromefitz/utils'
// import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

import { getCustom } from '~app/(cache)/getCustom'
// import { NotionBlocks } from '~components/Notion/Notion.Blocks'
// import { getDatabaseQuery } from 'next-notion/src/queries/index'
import {
  getSegmentInfo,
  // getPropertyTypeData,
  getPageData,
  // getShowData,
} from '~app/(notion)/(utils)/utils'
import {
  // DATABASE_ID,
  SEGMENT,
} from '~app/(notion)/pages/[[...catchAll]]/Page.constants'
// import { NotionBlocks as Blocks } from '~components/Notion/Notion.Blocks'
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
  const data = await getCustom({
    database_id: '',
    filterType: 'equals',
    preview,
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug: '/kitchen-sink',
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
