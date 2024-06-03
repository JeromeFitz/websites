import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'

import { MusicClient } from './_components/Music.client'

const slug = '/currently/listening-to'
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
    title: `404 | ${segmentInfo?.segment} | ${env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  const title = 'Listening To… | Jerome Fitzgerald (he/him)'

  return pageData?.isPublished
    ? { ...seo, openGraph: { ...seo.openGraph, title }, title }
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

  if (isObjectEmpty(data.page)) return null
  return <MusicClient />
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  // if (segmentInfo.isIndex) {
  //   return <Listing srevalidate={revalidate} segmentInfo={segmentInfo} />
  // }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
