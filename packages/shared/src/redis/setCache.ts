import 'server-only'

import type { RC } from './index'

import stringify from 'fast-json-stable-stringify'

import { TIME } from '../lib/constants'
import redis, { getKey } from './index'

// @todo(types) any
function setCache({ data, slug }: { data: any | RC; slug: string }) {
  const key = getKey(slug)
  void redis.set(key, stringify(data), {
    ex: TIME.MONTH,
  })
  return null
}

export { setCache }
