import useSWR, { mutate } from 'swr'

import fetcher from '~lib/fetcher'

const key = 'pages'
const initialStore = {}

function usePage({ id }) {
  const { data, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
    fallbackData: initialStore,
    revalidateOnFocus: false,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

const setPage = async (data, value) => {
  !!value && (await mutate(key, { ...data, [value.id]: value }, false))
}

export { setPage }
export default usePage
