import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import { draftMode } from 'next/headers'

import { getPageData, CONFIG } from '~app/(notion)/_config'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'

const slug = '/books'
const { SEGMENT } = CONFIG.PAGES

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()

  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const { seoDescription, title } = getPageData(data?.page?.properties) || ''

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
