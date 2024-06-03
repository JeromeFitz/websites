import { cx } from '@jeromefitz/ds/utils/cx'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// // import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { ContainerSection } from '@/app/playground/2024/_components/Container.Section'
import { HeaderFull } from '@/app/playground/2024/_components/Header.Full'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
// import { Lorem } from '@/app/playground/2024/_components/Lorem'
import { SectionSpacer } from '@/app/playground/2024/_components/Section.Spacer'
import { Notion as Blocks } from '@/components/Notion/index'
import { Quote } from '@/components/Quote/index'
import { quotes } from '@/data/quotes'

// import type { SectionType } from './_components/Section'

import { Section } from './_components/Section'

const slug = '/about'
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
    title: `404 | ${segmentInfo?.segment} | ${env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return pageData?.isPublished ? seo : is404Seo
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
      <HeaderFull overline="About" title="Jerome Fitzgerald (he/him)" />
      <Section />
      <ContainerSection>
        <SectionSpacer />
        <Box
          className={cx(
            'relative z-0 w-full justify-center overflow-visible p-[100px_0]',
            'rounded-3 grid flex-[0_0_auto] gap-6',
            'auto-rows-min grid-cols-4 grid-rows-4',
            // 'col-span-3',
            'bg-amber-5',
          )}
        >
          Why is this not showing?
        </Box>
      </ContainerSection>
      {quotes.map((quote, i) => {
        return <Quote item={quote} key={`quote--${i}`} />
      })}
      <ContainerWithSidebar>
        <HeaderSidebar hasBorder={false} title={title} />
        <ArticleMain>
          <Text size="4">{seoDescription}</Text>
          <Blocks data={data?.blocks} />
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

export default function Page(props) {
  const propsHack = {
    ...props,
    revalidate: props?.revalidate || false,
  }
  const segmentInfo = getSegmentInfo({ SEGMENT, ...propsHack })

  return <Slug revalidate={propsHack?.revalidate} segmentInfo={segmentInfo} />
}
