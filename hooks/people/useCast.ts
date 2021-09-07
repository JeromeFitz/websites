import useSWR, { mutate } from 'swr'

const key = 'cast'
const initialStore = {}

function useCast({ slug }) {
  const { data, error } = useSWR(`${slug}-${key}`, {
    fallbackData: initialStore,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

const setCast = async (keyMutate, data, value) => {
  await mutate(keyMutate, { ...data, [value.id]: value }, false)
}

export { key, setCast }
export default useCast
