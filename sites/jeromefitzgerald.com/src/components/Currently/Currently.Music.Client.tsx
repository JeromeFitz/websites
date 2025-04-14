'use client'
/**
 * @todo(api) NICE-125 this takes way too long to run
 *                on what should be a redis cache hit
 */
import useSWR from 'swr'

import type { NotionColor } from '@/lib/drizzle/schemas/_notion/types'

import { fetcher } from '@/lib/fetcher'
import { getKeySpotify, INIT } from '@/utils/getKeySpotify'

import { CurrentlyItem } from './Currently.Item'
import { CurrentlyWrapper } from './Currently.Item.Wrapper'
// const key = getKeySpotify(0, { ...INIT, time_range: 'short_term', type: 'top-tracks' })
const key = getKeySpotify(0, { ...INIT, limit: 1, type: 'recently-played' })

const options = {}

function CurrentlyMusicClient({
  titleSub,
  ...c
}: {
  color: NotionColor
  href: string
  icon: any
  id: string
  title: string
  titleSub: string
}) {
  const { color, href, icon, id, title } = c
  const propsParent = { color, href, icon, id, title }
  const { data, error, isLoading }: { data: any; error: any; isLoading: boolean } =
    useSWR(key, fetcher, options)

  const hasError = !!error || data?.items === undefined

  const top = hasError ? {} : data?.items[0]

  const headline = hasError ? titleSub[0] : top?.artist
  // const subline = hasError ? titleSub[1] : top?.album?.name
  const subline = hasError ? titleSub[1] : top?.name

  // const headline = titleSub[0]
  // const subline = titleSub[1]

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

export { CurrentlyMusicClient }
