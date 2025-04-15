/**
 * Spotify API
 *
 * @todo(spotify)
 *
 * recently-played cursor is: after|before
 * - its history is 50 records
 * - no need to cycle through cursors indefinetly
 * - just request limit of 50
 *
 * top-artists|tracks cursor is: offset
 * - works well with pageIndex
 */
const getKeySpotify = (pageIndex: number, { limit, time_range, type, url }: any) => {
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

export { getKeySpotify, INIT }
