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

import { draftMode } from 'next/headers'
import NextImage from 'next/image'
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
      <header className="relative left-0 top-0 m-[1em_calc(50%_-_50vw)] min-h-screen">
        <div className="absolute left-0 top-0 size-full ">
          <NextImage
            alt=""
            // placeholder="blur"
            fill={true}
            quality={100}
            src="https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg"
          />
        </div>
      </header>
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
