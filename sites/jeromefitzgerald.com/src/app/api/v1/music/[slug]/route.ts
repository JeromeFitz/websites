/* eslint-disable @typescript-eslint/ban-ts-comment */
import https from 'node:https'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'
import Client from '@jeromefitz/spotify'

import type { ClientProps, CredentialProps } from '@jeromefitz/spotify'

// import redis from '@jeromefitz/shared/redis/redis.js'
import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import ms from 'ms'
import { NextRequest, NextResponse } from 'next/server.js'

const keyPrefixSpotify = `${envClient.NEXT_PUBLIC__SITE}/spotify`

const redis = new Redis({
  agent: new https.Agent({ keepAlive: true }),
  retry: {
    backoff: (retryCount) => Math.exp(retryCount) * 50,
    retries: 5,
  },
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
  url: envServer.UPSTASH_REDIS_REST_URL,
})

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => (!time ? 0 : time / 1000)

const evictionPolicyTiming = {
  long_term: getTimeInSeconds(ms('30d')),
  medium_term: getTimeInSeconds(ms('7d')),
  now_playing: getTimeInSeconds(ms('2m')),
  recently_played: getTimeInSeconds(ms('1d')),
  short_term: getTimeInSeconds(ms('1d')),
}

const SLUG__VALIDATION = [
  'now-playing',
  'recently-played',
  'top-artists',
  'top-tracks',
]
const dataEmpty = { debug: { latency: 0, type: 'api' }, is_playing: false }

const getKey = ({ limit, offset, slug, time_range }) => {
  if (slug === 'now-playing') {
    const key = `${keyPrefixSpotify}/${slug}`
    return {
      evictionPolicy: evictionPolicyTiming['now_playing'],
      key,
    }
  }

  if (slug === 'recently-played') {
    const _params = `?limit=${limit}`
    const params = _slug(_params)
    const key = `${keyPrefixSpotify}/${slug}/${params}`.toLowerCase()
    return {
      evictionPolicy: evictionPolicyTiming['recently_played'],
      key,
    }
  }

  const _params = `?time_range=${time_range}&limit=${limit}&offset=${offset}`
  const params = _slug(_params)
  const key = `${keyPrefixSpotify}/${slug}/${params}`.toLowerCase()

  return {
    evictionPolicy: evictionPolicyTiming[time_range],
    key,
  }
}

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = envServer

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

// eslint-disable-next-line complexity
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params
  const slug = params.slug
  const { searchParams } = new URL(request.url)
  const limit = (searchParams.get('limit') ?? 10) as number
  const offset = (searchParams.get('offset') ?? 0) as number
  const time_range = searchParams.get('time_range') || 'medium_term'

  /**
   * @validation
   */
  if (!SLUG__VALIDATION.includes(slug))
    // return res?.status(200).json({ ...dataEmpty })
    return NextResponse.json({
      ...dataEmpty,
      now: Date.now(),
      status: 200,
    })

  /**
   * @cache
   */
  const { evictionPolicy, key } = getKey({ limit, offset, slug, time_range })

  let start = Date.now()
  //
  // let cache = await redis.get(key)
  const cache: any = await redis.get(key)

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
      case 'recently-played':
        start = Date.now()
        data = await spotify.get.recentlyPlayed({ limit, withImages: true })
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
      case 'top-artists':
        start = Date.now()
        data = await spotify.get.topArtists({
          limit,
          offset,
          // @todo(types) Type 'string' is not assignable to type 'TimeRangeProps | undefined'.
          // @ts-ignore
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
          // @todo(types) Type 'string' is not assignable to type 'TimeRangeProps | undefined'.
          // @ts-ignore
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
    return NextResponse.json({
      ...dataEmpty,
      status: 200,
    })
  }

  return NextResponse.json({
    ...result.data,
    debug: result?.debug,
    now: Date.now(),
    status: 200,
  })
}
