'use client'
/**
 * @todo(api) NICE-125 this takes way too long to run
 *                on what should be a redis cache hit
 */
// import { fetcher } from '@jeromefitz/shared/lib'

// import useSWR from 'swr'

// import { INIT, getKey } from '@/utils/getKey'

import { CurrentlyItem } from './Currently.Item'
import { CurrentlyWrapper } from './Currently.Item.Wrapper'

// const key = getKey(0, { ...INIT, time_range: 'long_term', type: 'top-tracks' })
// const options = {}

function CurrentlyMusicClient({ titleSub, ...c }) {
  const { color, href, icon, id, title } = c
  const propsParent = { color, href, icon, id, title }
  // const { data, error, isLoading } = useSWR(key, fetcher, options)

  // const hasError = !!error

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const top = hasError ? {} : data?.items[0]

  // const headline = hasError ? titleSub[0] : top?.artist
  // const subline = hasError ? titleSub[1] : top?.album?.name

  const headline = titleSub[0]
  const subline = titleSub[1]

  const props = {
    headline,
    id,
    isLoading: false,
    subline,
  }

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  )
}

export { CurrentlyMusicClient }
