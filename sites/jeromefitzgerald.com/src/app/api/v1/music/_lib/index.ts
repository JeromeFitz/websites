/* eslint-disable @typescript-eslint/ban-ts-comment */
import Client from '@jeromefitz/spotify'
import type { CredentialProps, ClientProps } from '@jeromefitz/spotify'
import { slug as _slug } from 'github-slugger'
import ms from 'ms'

const keyPrefixSpotify = `${process.env.NEXT_PUBLIC__SITE}/spotify`

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => time / 1000 ?? 0

const evictionPolicyTiming = {
  now_playing: getTimeInSeconds(ms('2m')),
  short_term: getTimeInSeconds(ms('1d')),
  medium_term: getTimeInSeconds(ms('7d')),
  long_term: getTimeInSeconds(ms('30d')),
}

const dataEmpty = { is_playing: false, debug: { type: 'api', latency: 0 } }

const getKey = ({ limit, offset, slug, time_range }) => {
  if (slug === 'now-playing') {
    const key = `${keyPrefixSpotify}/${slug}`
    return {
      key,
      evictionPolicy: evictionPolicyTiming['now_playing'],
    }
  }

  const _params = `?time_range=${time_range}&limit=${limit}&offset=${offset}`
  const params = _slug(_params)
  const key = `${keyPrefixSpotify}/${slug}/${params}`.toLowerCase()

  return {
    key,
    evictionPolicy: evictionPolicyTiming[time_range],
  }
}

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env

/**
 * @todo(types) how did i mess this up so bad haha
 * eslint-disable @typescript-eslint/ban-ts-comment
 */
const credentials: CredentialProps = {
  // @ts-ignore
  clientId,
  // @ts-ignore
  clientSecret,
  // @ts-ignore
  refreshToken,
}

const spotify: ClientProps = new Client({ accessToken: '', ...credentials })

export { dataEmpty, getKey, spotify }
