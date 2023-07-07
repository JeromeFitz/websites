const fetcher = async function <JSON>(requestInfo: RequestInfo): Promise<JSON> {
  /**
   * @todo(error-handling)
   */
  const response = await fetch(requestInfo)
  return response.json()
}

export { fetcher }
