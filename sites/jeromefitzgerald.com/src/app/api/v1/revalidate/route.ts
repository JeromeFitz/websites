import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import _size from 'lodash/size.js'
import { revalidatePath } from 'next/cache.js'
import { NextRequest, NextResponse } from 'next/server.js'

import { CONFIG } from '@/app/(notion)/_config/index'

const { DATABASE_ID: DATABASE_ID__EVENTS } = CONFIG.EVENTS
const { DATABASE_ID: DATABASE_ID__PAGES } = CONFIG.PAGES
const { DATABASE_ID: DATABASE_ID__SHOWS } = CONFIG.SHOWS

/**
 * @hack(next) Customization for makeshift ISR
 *  This is because we double-cache
 *  If you do not use a makeshift Redis KV you do not need this
 *  & should use `revaliate` only && revalidatePath (revalidateTag)
 *
 * Must provide a POST with valid AUTH and an object that contains:
 * - path
 * - route
 * - segment
 *
 * Example:
 *
 * {
 *  "path": "/events/[[...catchAll]]",
 *  "route": "/events/2023/07/01/irony-city",
 *  "segment": "events"
 * }
 *
 * {
 *  "path": "/events/[[...catchAll]]",
 *  "route": "/events",
 *  "segment": "events"
 * }
 *
 * {
 *  "path": "/",
 *  "route": "/",
 *  "segment": "pages"
 * }
 *
 */

// @todo(complexity) 12
// eslint-disable-next-line complexity
export async function POST(request: NextRequest) {
  const { path, route, segment } = await request.json()
  // const catchAll = route.split(`/${segment}/`)[1].split('/')
  const catchAllPrep = route.includes(segment) ? route.split(`/${segment}`) : []
  const catchAll =
    _size(catchAllPrep) === 0
      ? []
      : catchAllPrep[1].split('/').filter((str) => str !== '')

  const props = {
    params: {
      catchAll,
    },
  }

  const token = process.env.REVALIDATE_TOKEN
  const signature = request.headers.get('x-revalidate-signature-256')

  if (token === signature) {
    revalidatePath(path)
    const segmentInfo = getSegmentInfo({ SEGMENT: segment, ...props })

    let database_id
    switch (segment) {
      case 'events':
        database_id = DATABASE_ID__EVENTS
        break
      case 'pages':
        database_id = DATABASE_ID__PAGES
        break
      case 'shows':
        database_id = DATABASE_ID__SHOWS
        break
      default:
        break
    }

    if (!database_id) {
      return NextResponse.json({
        message: 'Bad Request (!databaseId)',
        now: Date.now(),
        revalidated: {
          data: null,
          path,
          route,
          segment,
          status: false,
        },
        segment: null,
        status: 400,
      })
    }

    let data
    if (segmentInfo.isIndex) {
      data = await getDataFromCache({
        database_id: '', // do not pass database
        draft: false,
        filterType: 'equals',
        revalidate: true,
        segmentInfo: { ...segmentInfo, slug: route === '/' ? '/homepage' : route },
      })
    } else {
      data = await getDataFromCache({
        database_id,
        draft: false,
        filterType: 'equals',
        revalidate: true,
        segmentInfo,
      })
    }

    if (data?.page === undefined || isObjectEmpty(data?.page)) {
      return NextResponse.json({
        message: 'Bad Request (!data)',
        now: Date.now(),
        revalidated: {
          data,
          path,
          route,
          segment,
          status: false,
        },
        status: 400,
      })
    } else {
      return NextResponse.json({
        message: 'Success',
        now: Date.now(),
        revalidated: {
          data,
          path,
          route,
          segment,
          status: true,
        },
        status: 200,
      })
    }
  }

  return NextResponse.json({
    message: 'Unauthorized',
    now: Date.now(),
    revalidated: {
      data: null,
      path,
      route,
      segment,
      status: false,
    },
    segment: null,
    status: 401,
  })
}
