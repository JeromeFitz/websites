import 'server-only'

import stringify from 'fast-json-stable-stringify'

import type { RC } from './index'

import { TIME } from '../lib/constants'
import redis, { getKey } from './index'

// @todo(types) any
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
function setCache({ data, slug }: { data: RC | any; slug: string }) {
  const key = getKey(slug)
  void redis.set(key, stringify(data), {
    ex: TIME.MONTH,
  })
  return null
}

export { setCache }
