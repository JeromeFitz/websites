import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function useNotion(routeType, options = {}) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/cms/${routeType}`,
    fetcher,
    options
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}

export { useNotion }
