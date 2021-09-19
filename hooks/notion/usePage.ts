// import useSWR, { useSWRConfig } from 'swr'
import useSWR from 'swr'

import fetcher from '~lib/fetcher'

const key = 'pages'
const initialStore = {}

function usePage({ id }) {
  // const { mutate } = useSWRConfig()
  const { data, error } = useSWR(`/api/notion/pages/${id}`, fetcher, {
    fallbackData: initialStore,
    revalidateOnFocus: true,
  })
  // console.dir(`mutate: ${!!data} (${id})`)
  // !!data && mutate(`/api/notion/pages/${id}`)

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

export default usePage
