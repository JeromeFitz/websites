'use client'

import type { NotionColor } from '@/lib/drizzle/schemas/_notion/types'

import useSWR from 'swr'

import { fetcher } from '@/lib/fetcher'

import { CurrentlyItem } from './Currently.Item'
import { CurrentlyWrapper } from './Currently.Item.Wrapper'

const key = `/api/v1/books/currently-reading`

const options = {}

function CurrentlyBookClient({
  titleSub,
  ...c
}: {
  color: NotionColor
  href: string
  icon: any
  id: string
  prefetch: boolean
  title: string
  titleSub: string
}) {
  const { color, href, icon, id, prefetch, title } = c
  const propsParent = { color, href, icon, id, prefetch, title }
  const { data, error, isLoading }: { data: any; error: any; isLoading: boolean } =
    useSWR(key, fetcher, options)

  const hasError = !!error || data?.data === undefined

  const top = hasError ? {} : data?.data[0]

  const headline = hasError ? titleSub[0] : top?.author_name
  const subline = hasError ? titleSub[1] : top?.title

  const props = {
    headline,
    id,
    isLoading,
    subline,
  }

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  )
}

export { CurrentlyBookClient }
