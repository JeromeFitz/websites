import type { Metadata, ResolvingMetadata } from 'next'

import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

import { getBooks, segment } from '@/lib/drizzle/schemas/cache-books/queries'
import {
  getPage,
  segment as segmentPage,
} from '@/lib/drizzle/schemas/cache-pages/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'
import { getKey } from '@/utils/getKey'

import { List } from './_components/List'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const items: Page[] = await getPage({ key: getKey(segmentPage, segment) })
  const item = items[0]
  const previousImages = (await parent).openGraph?.images || []
  const image = {
    href: `https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2025/03/lk-classroom-square-act.jpg`,
  }

  const title = `${item.title}`
  const description = item.seoDescription

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

export default async function Home() {
  const items = await getBooks()
  await buildInitialCache({ segment })

  return (
    <>
      <List items={items} />
    </>
  )
}
