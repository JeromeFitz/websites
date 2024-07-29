/**
 * Spotify API
 */
const getKey = (pageIndex, { limit, time_range, type, url }) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  const key = [
    `${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`,
  ]
  return key
}

const INIT = {
  limit: 10,
  offset: 0,
  time_range: 'medium_term',
  type: 'top-artists',
  url: '/api/v1/music',
}

export { getKey, INIT }
