import type { Metadata, ResolvingMetadata } from 'next'

import type { Book } from '@/lib/drizzle/schemas/cache-books/types'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import { notFound } from 'next/navigation.js'

import { getBook, segment } from '@/lib/drizzle/schemas/cache-books/queries'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'
import { getSegmentsForGenerateStaticParams } from '@/utils/next/getSegmentsForGenerateStaticParams'

import { Book as BookComponent } from './_components/Book'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

async function _generateStaticParams() {
  return await getSegmentsForGenerateStaticParams(segment)
}
export const generateStaticParams = envClient.IS_DEV
  ? undefined
  : _generateStaticParams

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = (await params).key
  const items: Book[] = await getBook({ key: getKey(segment, key) })

  if (isEmpty(items)) {
    return {
      title: `404: ${segment}`,
    }
  }

  const item = items[0]
  const previousImages = (await parent).openGraph?.images || []

  const image = {
    href: `https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2025/03/lk-classroom-square-act.jpg`,
  }

  const title = `“${item.title}” by ${item.author}`
  const description = `“${item.title}” by ${item.author}`

  return {
    description,
    openGraph: {
      description,
      images: [image?.href, ...previousImages],
      title,
    },
    title,
  }
}

async function Slug({ params }: Props) {
  const key = (await params).key
  const items: Book[] = await getBook({ key: getKey(segment, key) })

  if (isEmpty(items)) {
    return notFound()
  }

  const item = items[0]

  return <BookComponent item={item} />
}

export default Slug
