// import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDatabaseQuery,
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
import type { Metadata } from 'next'

import { draftMode } from 'next/headers.js'
import _title from 'title'

import { CONFIG, getBookData, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'

import { BookPage } from './_components/Book.client'

const slug = '/currently/reading'
const { SEGMENT } = CONFIG.BOOKS
const { DATABASE_ID } = CONFIG.BOOKS

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

  const title = 'Reading… | Jerome Fitzgerald (he/him)'

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

  const { title } = getPageData(data?.page?.properties) || ''

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const booksData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'starts_with',
    revalidate,
    segmentInfo,
  })
  const _items = booksData.results.map((item) => {
    // @todo(types)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { properties } = item
    const itemData: any = getBookData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    return itemData
  })

  /**
   * @todo
   * Well this is a ... less than ideal way of doing this.
   *
   */
  const books: any = [
    { color: 'orange', id: 'in-progress', items: [], notionFilter: 'In Progress' },
    { color: 'mint', id: 'in-queue', items: [], notionFilter: 'Pending' },
    { color: 'purple', id: 'completed', items: [], notionFilter: 'Complete' },
  ]

  // @todo(complexity) 15
  // eslint-disable-next-line complexity
  _items.map((item) => {
    if (!item?.status?.name) return null
    if (!item?.isActive) return null
    if (item?.status?.name === 'In Progress') {
      books[0].items.push(item)
      books[0].title = _title(books[0].id)
    }
    if (item?.status?.name === 'Pending') {
      books[1].items.push(item)
      books[1].title = _title(books[1].id)
    }
    if (item?.status?.name === 'Complete') {
      books[2].items.push(item)
      books[2].title = _title(books[2].id)
    }
    return null
  })

  // if (isObjectEmpty(data?.page)) return null
  return (
    <>
      <BookPage books={books} title={title} />
    </>
  )
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

  // if (segmentInfo.isIndex) {
  //   return <Listing egmentInfo={segmentInfo} srevalidate={revalidate} />
  // }
  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
