import useSWR, { mutate } from 'swr'

// const initialStore = {}

function useRelation({ swrKey }) {
  console.dir(`useRelation`)
  console.dir(useRelation)
  console.dir(`swrKey`)
  console.dir(swrKey)
  const { data, error } = useSWR(swrKey, {
    // fallbackData: initialStore,
    revalidateOnFocus: true,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  }
}

const setRelation = async (keyMutate, data, value) => {
  console.dir(`> keyMutate`)
  console.dir(keyMutate)
  console.dir(`> data`)
  console.dir(data)
  console.dir(`> value`)
  console.dir(value)
  await mutate(keyMutate, { ...data, [value.id]: value }, false)
}

export { setRelation }
export default useRelation
