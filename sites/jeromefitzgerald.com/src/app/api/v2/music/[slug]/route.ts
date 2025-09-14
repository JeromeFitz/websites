import type { NextRequest } from 'next/server.js'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { slug as _slug } from 'github-slugger'
import { NextResponse } from 'next/server.js'

import { getAppleMusic } from '@/lib/apple-music/get-apple-music'

const keyPrefixApple = `${envClient.NEXT_PUBLIC__SITE}/apple`

type SLUG =
  | 'history-heavy-rotation'
  | 'recent-played-albums'
  | 'recent-played-tracks'

type SLUGS = {
  [K in SLUG]: {
    route: string
  }
}

const SLUGS: SLUGS = {
  'history-heavy-rotation': { route: '/v1/me/history/heavy-rotation' },
  'recent-played-albums': { route: '/v1/me/recent/played' },
  'recent-played-tracks': { route: '/v1/me/recent/played/tracks' },
}
const dataEmpty = { debug: { key: '', latency: 0, type: 'api' } }

const getKey = ({
  limit = 10,
  offset = 0,
  slug,
}: {
  limit: number
  offset: number | null
  slug: string
}) => {
  if (slug === '/v1/me/recent/played/tracks') {
    const _params = `?limit=${limit}&offset=${offset}&types=songs`
    const params = _slug(_params)
    const key = `${keyPrefixApple}${slug}/${params}`.toLowerCase()
    return {
      key,
    }
  }

  if (slug === '/v1/me/recent/played') {
    const _params = `?limit=${limit}&offset=${offset}&types=albums`
    const params = _slug(_params)
    const key = `${keyPrefixApple}${slug}/${params}`.toLowerCase()
    return {
      key,
    }
  }

  if (slug === '/v1/me/history/heavy-rotation') {
    const _params = `?limit=${limit}&offset=${offset}&types=albums`
    const params = _slug(_params)
    const key = `${keyPrefixApple}${slug}/${params}`.toLowerCase()
    return {
      key,
    }
  }

  return { key: null }
}

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/v2/music/[slug]'>,
) {
  const start = Date.now()

  const { slug } = await ctx.params
  const { searchParams } = new URL(request.url)
  const limit = (searchParams.get('limit') ?? 10) as number
  const offset = (searchParams.get('offset') ?? 0) as number

  if (!SLUGS[slug as SLUG])
    return NextResponse.json({
      ...dataEmpty,
      status: 200,
    })

  const { route } = SLUGS[slug as SLUG]
  const { key } = getKey({ limit, offset, slug: route })

  const data = await getAppleMusic({
    limit,
    offset,
    route,
    userToken: envServer.APPLE_TOKEN_USER,
  })

  return NextResponse.json({
    ...data,
    debug: { key, latency: Date.now() - start, type: 'api' },
    status: 200,
  })
}
