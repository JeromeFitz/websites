import useSWR, { mutate } from 'swr'

import fetcher from '~lib/fetcher'

const key = 'relations'
const initialStore = {}

function useRelationPrep({ id }) {
  const { data, error } = useSWR(() => `/api/notion/pages/${id}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

function useRelation() {
  const { data, error } = useSWR(key, {
    fallbackData: initialStore,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

const setRelation = async (data, value) => {
  !!value && (await mutate(key, { ...data, [value.id]: value }, false))
}

export { useRelationPrep, setRelation }
export default useRelation
