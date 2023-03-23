import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function useNotion(routeType) {
  const { data, error, isLoading } = useSWR(`/api/v1/cms/${routeType}`, fetcher)
  return {
    data,
    isLoading,
    isError: error,
  }
}

export { useNotion }
