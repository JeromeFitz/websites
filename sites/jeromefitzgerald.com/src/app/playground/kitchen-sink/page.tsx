import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import { getDataFromCache, getSegmentInfo } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { draftMode } from 'next/headers'
// // // @todo(next) esm
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { notFound } from 'next/navigation'

import { CONFIG, getPageData } from '~app/(notion)/_config'
import { FourOhFour } from '~app/_errors/404'
import { Notion as Blocks } from '~components/Notion'

const isDev = process.env.NODE_ENV === 'development'
const slug = '/kitchen-sink'
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
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export default function Page({ revalidate = false, ...props }) {
  // if (!isDev) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
