import _merge from 'lodash/merge'
import useSWR, { mutate } from 'swr'

const initialStore = {}

function useRelation({ swrKey }) {
  console.dir(`> useRelation: ${swrKey}`)
  const { data, error } = useSWR(swrKey, {
    fallbackData: initialStore,
    revalidateOnFocus: true,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  }
}

const setRelation = async (keyMutate, data, value) => {
  // console.dir(`> setRelation`)
  // console.dir(data)
  !!value && (await mutate(keyMutate, _merge(data, { [value.id]: value }), false))
  void mutate(keyMutate)
}

export { setRelation }
export default useRelation
