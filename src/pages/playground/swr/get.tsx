import { Box, Text } from '@jeromefitz/design-system/components'
import { useEffect, useRef, useState } from 'react'

import { PageHeading } from '~components/Layout'
import useOnScreen from '~hooks/useOnScreen'
import useSWRInfinitePages from '~hooks/useSWRInfinitePages'
import fetcher from '~lib/fetcher'

const INIT = {
  title: 'SWR: Hook',
  description: 'Infinite Loading',
}

const getKey = (pageIndex, { limit, time_range, type, url }) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  return [`${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`]
}

const options = {
  limit: 10,
  time_range: 'long_term',
  type: 'top-tracks',
  url: '/api/spotify',
}

const showFlag = (flag: boolean) => (flag ? 'true' : 'false')
/**
 * @spotify fuck ariel pink
 */
const spotifyRemoveIds = ['5H0YoDsPDi9fObFmJtTjfN']

const SwrPage = () => {
  /**
   * @vars
   */
  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const [total, totalSet] = useState(0)
  // const [totalRange, totalRangeSet] = useState(spotifyRange(total))
  // const [canFetchMoreSpotify, canFetchMoreSpotifySet] = useState(false)
  /**
   * @swr
   */
  const {
    canFetchMore,
    data,
    // error,
    fetchMore,
    // isEmpty,
    isFetchingMore,
    isLoadingInitialData,
    isLoadingMore,
    // isRefreshing,
    // isValidating,
    // lastPage,
    // mutate,
    pages,
    // size,
  } = useSWRInfinitePages((pageIndex) => getKey(pageIndex, options), fetcher, {
    dataPath: 'items',
    limit: options.limit,
    //
    revalidateAll: false,
    revalidateFirstPage: false,
  })

  useEffect(() => {
    !isLoadingInitialData && totalSet(pages[0]?.total)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingInitialData])

  useEffect(() => {
    /**
     * @hack override for `canFetchMore`
     * @spotify !!next => you can fetch more
     *
     * `short_term` => `top-artists` brings back 9/10 for some reason
     *
     * 🤣 you moron, it is because you do not have enough
     *
     */
    // if (canFetchMore) {
    // canFetchMoreSpotifySet(!!pages[pages.length - 1].next)
    // }
    if (canFetchMore && !isFetchingMore && !isLoadingMore && isVisible) {
      void fetchMore()
    }
  }, [
    canFetchMore,
    // canFetchMoreSpotify,
    // data,
    fetchMore,
    isFetchingMore,
    isLoadingMore,
    isVisible,
    // pages,
    // total,
  ])

  // console.dir(`🍔 [useSWRInfinitePages]`)
  // console.dir(`🛠️ variables:`)
  // console.dir(`  canFetchMore:          ${canFetchMore}`)
  // console.dir(`  isEmpty:               ${isEmpty}`)
  // console.dir(`  isFetchingMore:        ${isFetchingMore}`)
  // console.dir(`  isLoadingInitialData:  ${isLoadingInitialData}`)
  // console.dir(`  isLoadingMore:         ${isLoadingMore}`)
  // console.dir(`  isRefreshing:          ${isRefreshing}`)
  // console.dir(`  isValidating:          ${isValidating}`)
  // console.dir(`  size:                  ${size}`)
  // console.dir(`  total:                 ${total}`)
  // console.dir(`🗃️ data:`)
  // console.dir(data)
  // console.dir(`📄 pages:`)
  // console.dir(pages)

  return (
    <>
      <PageHeading description={INIT.description} title={INIT.title} />

      <Box
        css={{
          backgroundColor: '$colors$gray12',
          color: '$colors$loContrast',
          fontFamily: '$mono',
          position: 'sticky',
          p: 4,
          top: '0px',
        }}
      >
        <Text
          size="5"
          css={{ color: '$colors$loContrast', fontFamily: '$mono', my: 5 }}
        >
          Status:
        </Text>
        <ul>
          <li>
            data.length: {data?.length ?? 0} / {total}
          </li>
          <li>canFetchMore: {showFlag(canFetchMore)}</li>
          <li>isFetchingMore: {showFlag(isFetchingMore)}</li>
          <li>isLoadingMore: {showFlag(isLoadingMore)}</li>
          <li>isVisible: {showFlag(isVisible)}</li>
        </ul>
      </Box>
      <Box css={{ backgroundColor: '$colors$red11', height: '100vw' }} />
      <ol style={{ listStyleType: 'decimal-leading-zero' }}>
        {data?.map((item: any) => {
          if (spotifyRemoveIds.includes(item.id)) return null
          return <li key={item.id}>{item.name}</li>
        })}
      </ol>

      <div ref={ref} />
    </>
  )
}

export default SwrPage
