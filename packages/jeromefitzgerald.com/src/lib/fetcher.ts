const fetcher = async function <JSON = any>(
  input: RequestInfo
  // init?: RequestInit
): Promise<JSON> {
  // const res = await fetch(input, init)
  const res = await fetch(input)
  return res.json()
}

export default fetcher
