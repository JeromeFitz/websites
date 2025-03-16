import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { HeaderFull } from '@/app/playground/2024/_components/Header.Full'

import { Section } from './_components/Section'

const slug = '/about'
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

export default async function Page(props) {
  const revalidate = props?.revalidate || false
  const { params } = props
  const { catchAll } = await params
  const segmentInfo = getSegmentInfo({
    params: { catchAll },
    revalidate,
    SEGMENT,
  })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
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

  // const { seoDescription, title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null

  return (
    <Flex direction="column">
      <HeaderFull overline="About" title="Jerome Fitzgerald (he/him)" />
      <Section />
    </Flex>
  )
}
