import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
import { Notion as Blocks } from '@/components/Notion/index'

const slug = '/colophon'
const { SEGMENT } = CONFIG.PAGES

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const { isEnabled } = await draftMode()
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
  const { isEnabled } = await draftMode()

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
  // console.dir(data?.blocks)
  return (
    <ContainerWithSidebar>
      <HeaderSidebar hasBorder={false} title={title} />
      <ArticleMain>
        <Text size="4">{seoDescription}</Text>
        <Blocks data={data?.blocks} />
      </ArticleMain>
    </ContainerWithSidebar>
  )
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({
    SEGMENT /* @next-codemod-ignore 'props' is used with spread syntax (...). Any asynchronous properties of 'props' must be awaited when accessed. */,
    ...props,
    revalidate,
  })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
