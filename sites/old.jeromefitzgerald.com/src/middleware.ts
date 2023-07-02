import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

// import { log } from '~utils/log'

// const DEBUG_KEY = 'middleware.ts >> '

const isDev = process.env.NODE_ENV !== 'production'
const RATE_LIMIT = 100

const ratelimit = new Ratelimit({
  analytics: true,
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(RATE_LIMIT, '10 s'),
  // https://github.com/upstash/ratelimit#timeout
  timeout: 1000, // 1 second
})

async function Middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  const ip = request.ip ?? '127.0.0.1'
  // log(`${DEBUG_KEY} ip`, ip)

  /**
   * @note(next) please reduce these API calls
   */
  if (isDev) {
    return NextResponse.next()
  }
  // @hack(vercel) is this blocking the edge requests?
  // return NextResponse.next()

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `mw_${ip}`
  )
  event.waitUntil(pending)

  // log(`${DEBUG_KEY} success`, success)
  // // log(`${DEBUG_KEY} pending`, pending)
  // log(`${DEBUG_KEY} limit`, limit)
  // log(`${DEBUG_KEY} reset`, reset)
  // log(`${DEBUG_KEY} remaining`, remaining)

  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/api/blocked', request.url), request)

  res.headers.set('X-RateLimit-Limit', limit.toString())
  res.headers.set('X-RateLimit-Remaining', remaining.toString())
  res.headers.set('X-RateLimit-Reset', reset.toString())
  return res
}

/**
 * @note(next)
 * ref: https://nextjs.org/docs/advanced-features/middleware#matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _vercel/insights (analytic files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|_vercel/insights|favicon.ico).*)',
  ],
}

export default Middleware
