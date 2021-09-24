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
  ARTISTS: `https://api.spotify.com/v1/artists`,
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

export const getGenres = async ({ ids }) => {
  const { access_token } = await getAccessToken()

  const url = ENDPOINT.ARTISTS
  const urlCustom = url + `?ids=${ids.replace(',', '%2C')}`

  return fetch(urlCustom, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getBio = async ({ id }) => {
  const url = `https://api-partner.spotify.com/pathfinder/v1/`
  const urlCustom =
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    url +
    `query?operationName=queryArtistOverview&variables=%7B%22uri%22%3A%22spotify%3Aartist%3A` +
    id +
    `%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d66221ea13998b2f81883c5187d174c8646e4041d67f5b1e103bc262d447e3a0%22%7D%7D`

  // // @hack(spotify) this is borderline unethical but i am curious
  // // const { access_token } = await getAccessToken()
  const access_token = process.env.SPOTIFY_HACK_PATHFINDER_TOKEN

  return await fetch(urlCustom, {
    headers: {
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en',
      'app-platform': 'OSX',
      'client-token': process.env.SPOTIFY_HACK_CLIENT_TOKEN,
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua': '"Chromium";v="91"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'spotiy-app-version': '1.1.68.632',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Spotify/1.1.68.632 Safari/537.36',
      authorization: `Bearer ${access_token}`,
      authority: 'api-partner.spotify.com',
      accept: 'application/json',
      dnt: '1',
      origin: 'https://xpui.app.spotify.com',
      referer: 'https://xpui.app.spotify.com/',
    },
  })
}
//
