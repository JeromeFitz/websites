// import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
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
// const { DATABASE_ID: DATABASE_ID__PAGES } = CONFIG.PAGES

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

  const title = 'Listening To… | Jerome Fitzgerald (he/him)'

  const is404 = isObjectEmpty(data?.blocks || {})
  const is404Seo = {
    // title: `404 | ${segmentInfo?.segment} | ${env.NEXT_PUBLIC__SITE}`,
    title,
  }

  if (is404) return is404Seo

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return pageData?.isPublished
    ? { ...seo, openGraph: { ...seo.openGraph, title }, title }
    : is404Seo
}

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()

  // console.dir(`segmentInfo`)
  // console.dir(segmentInfo)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // const isUndefined = data?.page === undefined
  // if isObjectEmpty(data?.page)) return null
  return <MusicClient />
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, /* @next-codemod-error 'props' is used with spread syntax (...). Any asynchronous properties of 'props' must be awaited when accessed. */
  ...props })

  // if (segmentInfo.isIndex) {
  //   return <Listing srevalidate={revalidate} segmentInfo={segmentInfo} />
  // }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
