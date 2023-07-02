/* eslint-disable @typescript-eslint/ban-ts-comment */
import Client from '@jeromefitz/spotify'
import type { CredentialProps, ClientProps } from '@jeromefitz/spotify'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import ms from 'ms'
import { NextApiResponse } from 'next'
import redis from 'next-notion/src/lib/redis'

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

const SLUG__VALIDATION = ['now-playing', 'top-artists', 'top-tracks']
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

const spotifyApi = async (req: any, res: NextApiResponse) => {
  const {
    query: {
      limit = 10 as number,
      offset = 0 as number,
      slug,
      time_range = 'medium_term',
    },
  } = req

  /**
   * @validation
   */
  if (!SLUG__VALIDATION.includes(slug))
    return res?.status(200).json({ ...dataEmpty })

  /**
   * @cache
   */
  const { key, evictionPolicy } = getKey({ limit, offset, slug, time_range })

  let start = Date.now()
  //
  // let cache = await redis.get(key)
  const cache: any = await redis.get(key)

  // console.dir(cache)

  // cache = !!cache && JSON?.parse(cache)
  const result: any = {}
  let data: any = {}

  if (cache) {
    result.data = cache
    result.debug = {
      key,
      latency: Date.now() - start,
      type: 'cache',
    }
  } else {
    switch (slug) {
      case 'now-playing':
        start = Date.now()
        data = await spotify.get.nowPlaying({ withImages: true })
        result.data = data
        result.debug = {
          key,
          latency: Date.now() - start,
          type: 'api',
        }
        // @cache(set) redis
        if (result.data.is_playing) {
          // void redis.set(key, stringify(result.data), 'EX', evictionPolicy)
          void redis.set(key, stringify(result.data), { ex: evictionPolicy })
        }
        break
      case 'top-artists':
        start = Date.now()
        data = await spotify.get.topArtists({
          limit,
          offset,
          time_range,
          withImages: true,
        })
        result.data = data
        result.debug = {
          key,
          latency: Date.now() - start,
          type: 'api',
        }
        // @cache(set) redis
        // void redis.set(key, stringify(result.data), 'EX', evictionPolicy)
        void redis.set(key, stringify(result.data), { ex: evictionPolicy })
        break
      case 'top-tracks':
        start = Date.now()
        data = await spotify.get.topTracks({
          limit,
          offset,
          time_range,
          withImages: true,
        })
        result.data = data
        result.debug = {
          key,
          latency: Date.now() - start,
          type: 'api',
        }
        // @cache(set) redis
        // void redis.set(key, stringify(result.data), 'EX', evictionPolicy)
        void redis.set(key, stringify(result.data), { ex: evictionPolicy })
        break
      default:
        data = { ...dataEmpty }
        break
    }
  }

  // @hack(spotify) lol, error handling, wut
  if (data?.status === 204 || data?.status > 400) {
    return res?.status(200).json({ ...dataEmpty })
  }

  return res.status(200).json({ ...result.data, debug: result?.debug })
}

export default spotifyApi
