import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { Layout } from '@/components/Layout/index'

import { MusicClient } from './_components/Music.client'

const slug = '/music'
const { SEGMENT } = CONFIG.MUSIC

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

  if (isObjectEmpty(data.page)) return null
  return <MusicClient />
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  // if (segmentInfo.isIndex) {
  //   return (
  //     <Layout>
  //       <Listing srevalidate={revalidate} segmentInfo={segmentInfo} />
  //     </Layout>
  //   )
  // }
  return (
    <Layout>
      <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
    </Layout>
  )
}
