const getNextPageStatus = (data, error) => {
  const isError = error !== undefined
  const isDataUndefined =
    data === undefined || data?.content === undefined || data?.info === undefined
  const isLoading = !isError && isDataUndefined

  return {
    isDataUndefined,
    isError,
    isLoading,
  }
}

export default getNextPageStatus
