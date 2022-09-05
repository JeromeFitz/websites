const fetcher = async function <JSON = any>(
  input: RequestInfo
  // init?: RequestInit
): Promise<JSON> {
  // const res = await fetch(input, init)
  const res = await fetch(input)
  return res.json()
}

/**
 * @note(swr) Use for Dynamic Fetching but try to avoid
 * Specifically for Menu, if you know the type of items,
 *  just explicitly call them so we can re-use cache
 * As this will create a separate key cahce store this way (I think)
 */
function fetcherMulti(...urls) {
  return Promise.all(urls.map((url) => fetcher(url)))
}

export { fetcher, fetcherMulti }
