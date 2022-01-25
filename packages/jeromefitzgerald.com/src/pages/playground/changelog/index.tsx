import { Box, Text, PageHeading } from '@jeromefitz/design-system/components'
import useOnScreen from '@jeromefitz/design-system/hooks/useOnScreen'
import useSWRInfinitePages from '@jeromefitz/design-system/hooks/useSWRInfinitePages'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import * as React from 'react'

import fetcher from '~lib/fetcher'
const INIT = {
  title: 'Changelog',
  description: 'Releases',
}

const options = {
  page: 1,
  per_page: 10,
  type: 'releases',
  url: '/api/github',
}

const getKey = (pageIndex, { per_page, type, url }) => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const page = pageIndex === 0 ? 1 : pageIndex + 1
  return [`${url}/${type}?per_page=${per_page}&page=${page}`]
}

const showFlag = (flag: boolean) => (flag ? 'true' : 'false')

const Changelog = () => {
  const ref = React.useRef()
  const isVisible = useOnScreen(ref)
  const [total, totalSet] = React.useState(0)

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
    dataPath: 'data',
    limit: options.per_page,
    //
    revalidateAll: false,
    revalidateFirstPage: false,
  })

  React.useEffect(() => {
    !isLoadingInitialData && totalSet(pages[0]?.total)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingInitialData])

  React.useEffect(() => {
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
      <ul style={{ listStyleType: 'disc' }}>
        {data?.map((item: any) => {
          const iso = parseISO(item.published_at)
          const timestamp = format(iso, `EEEE, MMMM do`)
          return (
            <Box as="li" css={{ my: '$4' }} key={item.id}>
              <Box>
                <Text css={{ fontFamily: '$mono', my: '$1' }} size="4">
                  {item.name.replace('website-v', '')}
                </Text>
                <Text css={{ fontFamily: '$mono', my: '$1' }} size="3">
                  {timestamp}
                </Text>
              </Box>
            </Box>
          )
        })}
      </ul>

      <div ref={ref} />
    </>
  )
}

export default Changelog
