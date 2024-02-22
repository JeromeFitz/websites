// import { cx } from '@jeromefitz/ds/utils/cx'
import { getDataFromCache, getSegmentInfo } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { draftMode } from 'next/headers'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { PageHome } from '@/app/playground/2024/_components/Page.Home'
// import { Notion as Blocks } from '@/components/Notion'

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

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return pageData?.isPublished
    ? {
        ...seo,
        description:
          'Jerome Fitzgerald is an an actor, comedian, & writer hailing from Pittsburgh, PA.',
        title: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
      }
    : is404Seo
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

  // const { seoDescription, title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  return <PageHome />
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props, revalidate })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
