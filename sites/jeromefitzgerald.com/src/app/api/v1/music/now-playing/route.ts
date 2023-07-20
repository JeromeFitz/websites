import redis from '@jeromefitz/shared/src/redis'
import stringify from 'fast-json-stable-stringify'
import { NextRequest, NextResponse } from 'next/server'

import { dataEmpty, getKey, spotify } from '../_lib'

const slug = 'now-playing'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = (searchParams.get('limit') ?? 10) as number
  const offset = (searchParams.get('offset') ?? 0) as number
  const time_range = searchParams.get('time_range') || 'medium_term'

  /**
   * @cache
   */
  const { key, evictionPolicy } = getKey({ limit, offset, slug, time_range })

  let start = Date.now()
  const cache: any = await redis.get(key)

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
