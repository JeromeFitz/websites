const getKeyAppleMusic = (pageIndex: number, { limit, type, url }: any) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  const key = [`${url}/${type}?limit=${limit}&offset=${offset}`]
  return key
}

const INIT = {
  limit: 10,
  offset: 0,
  type: 'recent-played-tracks',
  url: '/api/v2/music',
}

export { getKeyAppleMusic, INIT }
