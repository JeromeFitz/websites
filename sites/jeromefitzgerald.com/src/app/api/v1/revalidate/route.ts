/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache.js'
import { NextRequest, NextResponse } from 'next/server.js'

import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { getShow } from '@/lib/drizzle/schemas/cache-shows/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

import { isValid as _isValid } from './actions'

type Validated = {
  isDynamic?: boolean
  key?: string
  revalidated?: boolean
  timestamp?: number
}

// eslint-disable-next-line @typescript-eslint/require-await
async function test({
  key,
  path,
  segment,
}: {
  key: string
  path: string
  segment: string
}): Promise<Validated> {
  return { isDynamic: false, key: '/test', revalidated: true, timestamp: Date.now() }
}

export async function POST(request: NextRequest) {
  const { path, segment, slug } = await request.json()
  const isDynamic = ['\\[', '\\]'].every((el) => {
    return path.match(new RegExp(el, 'i'))
  })
  const isSpecificRoute = true
  const isValid = _isValid(request.headers.get('x-revalidate-signature-256'))

  if (!isValid) {
    return NextResponse.json({
      revalidated: false,
      timestamp: Date.now(),
    })
  }

  const key = getKey(segment, slug)
  const items: Show[] = await getShow({ key })
  if (isEmpty(items)) {
    return NextResponse.json({
      revalidated: false,
      timestamp: Date.now(),
    })
  }
  revalidatePath(key)
  // await buildInitialCache({ revalidate: true, segment: 'shows' })

  const result = await test({ key, path, segment })

  if (isSpecificRoute) {
    revalidatePath(key)
  }
  if (isDynamic) {
    revalidatePath(path, 'page')
  }

  return NextResponse.json({
    isDynamic,
    key,
    timestamp: Date.now(),
    ...result,
  })
}
