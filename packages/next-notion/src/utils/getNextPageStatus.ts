const getNextPageStatus = (data, error) => {
  const isError = error !== undefined
  const isDataUndefined =
    data === undefined || data?.content === undefined || data?.info === undefined
  const isLoading = !isError && isDataUndefined
  const is404 = !isLoading && !data?.info

  /**
   * @debug
   */
  // console.dir(`isError: ${isError}`)
  // console.dir(`isDataUndefined: ${isDataUndefined}`)
  // console.dir(`isLoading: ${isLoading}`)
  // console.dir(`is404: ${is404}`)
  // console.dir(data)
  /**
   * ------
   */

  return {
    is404,
    isDataUndefined,
    isError,
    isLoading,
  }
}

export default getNextPageStatus
