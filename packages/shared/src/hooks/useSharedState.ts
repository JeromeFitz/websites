import useSWR from 'swr'

const useSharedState = (key, fallbackData = {}) => {
  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData,
  })

  return [state, setState]
}

export { useSharedState }
