import type { Metadata, ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation.js'

import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

import { getBooks, segment } from '@/lib/drizzle/schemas/cache-books/queries'
import {
  getPage,
  segment as segmentPage,
} from '@/lib/drizzle/schemas/cache-pages/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

import { BookPage } from './_components/Book.client'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}
export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = getKey(segmentPage, segment)
  const infoInit: Page[] = await getPage({ key })
  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    }
  }
  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    }
  }

  const info = infoInit[0]
  const previousImages = (await parent).openGraph?.images || []

  const image = {
    href: `https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2025/03/lk-classroom-square-act.jpg`,
  }

  const title = `${info.title}`
  const description = `${info.seoDescription}`

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

async function Slug() {
  // @note(cache) only runs on init
  await buildInitialCache({ segment })

  const keyPage = getKey(segmentPage, segment)
  const infoInit: Page[] = await getPage({ key: keyPage })
  if (isEmpty(infoInit)) return notFound()
  // const info = infoInit[0]
  // const blocksInit: Block[] = await getBlocks({ key: keyPage })
  /**
   * @todo(suspense)
   * do not technically _need_ data yet
   */
  const items = await getBooks()

  return <BookPage items={items} />
}

export default Slug
