import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPropertyTypeData } from 'next-notion/src/utils'

import { getPageData, CONFIG } from '~app/(notion)/_config'
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

const slug = '/homepage'
const { SEGMENT } = CONFIG.PAGES

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const { isEnabled } = draftMode()
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    // @todo(next) revalidate
    revalidate: false,
    segmentInfo: {
      ...segmentInfo,
      slug,
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
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export default function Page({ revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
