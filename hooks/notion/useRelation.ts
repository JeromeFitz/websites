import useSWR from 'swr'

const key = 'relations'
const initialStore = {}

function useRelation() {
  const { data, error, mutate } = useSWR(key, {
    fallbackData: initialStore,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
    mutate,
  }
}

// const setRelation = async (data, value) => {
//   !!value && (await mutate(key, { ...data, [value.id]: value }, false))
// }

// export { setRelation }
export default useRelation
