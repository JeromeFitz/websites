import querystring from 'querystring'

import _find from 'lodash/find'

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const LIMIT = 10 // 20 Default
type TIME_RANGE_ITEM_PROPS = {
  description: string
  time_range: string
  title: string
  value: string
}
type TIME_RANGE_PROPS = {
  [id: string]: TIME_RANGE_ITEM_PROPS
}

const TIME_RANGE: TIME_RANGE_PROPS = {
  // All-Time
  long: {
    description: 'All-Time',
    time_range: 'long_term',
    title: 'long_term',
    value: 'long_term',
  },
  // ~6 Months
  medium: {
    description: '~6 Months',
    time_range: 'medium_term',
    title: 'medium_term',
    value: 'medium_term',
  },
  // ~1 Month
  short: {
    description: '~1 Month',
    time_range: 'short_term',
    title: 'short_term',
    value: 'short_term',
  },
}

const ENDPOINT = {
  NOW_PLAYING: `https://api.spotify.com/v1/me/player/currently-playing`,
  TOP_ARTISTS: `https://api.spotify.com/v1/me/top/artists`,
  TOP_TRACKS: `https://api.spotify.com/v1/me/top/tracks`,
}

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getSpotifyUrlWithParams = ({ limit, url, time_range }) => {
  let returnUrl = url
  // @hack(yuck)
  if (!!limit || !!time_range) returnUrl += `?`
  if (!!limit) returnUrl += `limit=${limit}`
  if (!!time_range) {
    if (!!limit) returnUrl += '&'
    const verifyTimeRange =
      _find(TIME_RANGE, { title: time_range }) || TIME_RANGE.medium

    returnUrl += `time_range=${verifyTimeRange.title}`
  }

  return returnUrl
}

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(ENDPOINT.NOW_PLAYING, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopArtists = async ({
  limit = LIMIT,
  time_range = TIME_RANGE.medium,
}) => {
  const { access_token } = await getAccessToken()

  const url = getSpotifyUrlWithParams({
    limit,
    url: ENDPOINT.TOP_ARTISTS,
    time_range,
  })

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async ({
  limit = LIMIT,
  time_range = TIME_RANGE.medium,
}) => {
  const { access_token } = await getAccessToken()

  const url = getSpotifyUrlWithParams({
    limit,
    url: ENDPOINT.TOP_TRACKS,
    time_range,
  })

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
