import { PageHeading } from '@jeromefitz/design-system/components'
import useOnScreen from '@jeromefitz/design-system/hooks/useOnScreen'
import * as React from 'react'
import useSWRInfinite from 'swr/infinite'

import fetcher from '~lib/fetcher'

const INIT = {
  url: '/api/spotify',
  title: 'SWR',
  description: 'Infinite Loading',
  //
  limit: 10,
  offset: 0,
  time_range: 'long_term',
  type: 'top-tracks',
}

const getKey = (
  pageIndex: number,
  props: {
    limit: number
    time_range: string
    type: string
    url: string
  }
) => {
  const { limit, time_range, type, url } = props
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  return `${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`
}

// eslint-disable-next-line complexity
const SwrPage = () => {
  const ref = React.useRef()

  const [limit] = React.useState(10)
  // const [offset] = React.useState(0)
  const [time_range, time_rangeSet] = React.useState('long_term')
  const [type, typeSet] = React.useState('top-tracks')
  const [url] = React.useState(INIT.url)

  const [total, totalSet] = React.useState(0)
  const isVisible = useOnScreen(ref)

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex) => {
      const props = {
        limit,
        time_range,
        type,
        url,
      }
      return getKey(pageIndex, props)
    },
    fetcher,
    { revalidateFirstPage: false }
  )

  const items = data ? data.map((d) => d?.items).flat() : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.items?.length < INIT.limit)
  const isRefreshing = isValidating && data && data.length === size

  React.useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      void setSize(size + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isRefreshing])

  React.useEffect(() => {
    !!data && totalSet(data[0]?.total)
  }, [data])

  return (
    <>
      <PageHeading description={INIT.description} title={INIT.title} />
      <button
        onClick={() => {
          void time_rangeSet('medium_term')
        }}
      >
        change to: medium_term
      </button>
      <button
        onClick={() => {
          void typeSet('top-artists')
        }}
      >
        change to: top-artists
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          setSize(1)
        }}
      >
        load items
      </button>
      <p>
        showing {size} page(s) of {isLoadingMore ? '...' : items.length} ({total})
        item(s){' '}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'loading...'
            : isReachingEnd
            ? 'no more items'
            : 'load more'}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? 'refreshing...' : 'refresh'}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
      <ol>
        {isEmpty ? <li>😵️ no items</li> : null}
        {!!items &&
          items.map((item) => {
            // console.dir(item)
            return type === 'top-artists' ? (
              <li key={item.id}>{item.name}</li>
            ) : (
              <li key={item.id}>
                {item.artist}, “{item.name}”
              </li>
            )
          })}
      </ol>
      <div ref={ref}>
        {isLoadingMore ? 'loading...' : isReachingEnd ? 'no more items' : ''}
      </div>
    </>
  )
}

export default SwrPage
