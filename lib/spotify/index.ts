import querystring from 'querystring'

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const LIMIT = 10 // 20 Default
const TIME_RANGE = {
  long: 'long_term', // All-Time
  medium: 'medium_term', // ~6 Months
  short: 'short_term', // ~1 Month
}

const ENDPOINT = {
  NOW_PLAYING: `https://api.spotify.com/v1/me/player/currently-playing`,
  TOP_ARTISTS: `https://api.spotify.com/v1/me/top/artists?limit=${LIMIT}&time_range=${TIME_RANGE.medium}`,
  TOP_TRACKS: `https://api.spotify.com/v1/me/top/tracks?limit=${LIMIT}&time_range=${TIME_RANGE.medium}`,
}

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

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

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken()

  return fetch(ENDPOINT.TOP_ARTISTS, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(ENDPOINT.TOP_TRACKS, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
