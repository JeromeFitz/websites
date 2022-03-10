// import { useSharedState } from '@jeromefitz/shared/src/hooks/useSharedState'
import { isObjectEmpty } from '@jeromefitz/utils'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { getNextPageStatus } from 'next-notion/src/utils'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

const ShowsListing = dynamic(() => import('~routes/Shows/Listing'), {
  ssr: false,
})

const routeType = 'shows'

const IndexShowLising = () => {
  const { data, error } = useSWR<any>(() => `/api/v1/cms/${routeType}`, fetcher, {
    // @question(swr) do we need to mock to this extent?
    fallbackData: {
      info: undefined,
      content: undefined,
      images: undefined,
      items: undefined,
    },
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { is404, isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error,
    `/${routeType}`
  )

  if (isLoading) return null
  if (is404) return null
  if (isError && isDataUndefined) return null
  if (isObjectEmpty(data?.images)) return null

  // console.dir(`data:`)
  // console.dir(data)

  return (
    <>
      <ShowsListing routeType={routeType} data={data} images={data?.images} />
    </>
  )
}

export default IndexShowLising
