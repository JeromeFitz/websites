import 'server-only'
import https from 'node:https'

import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'

import { TIME } from '~app/(notion)/(config)/constants'

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

import { getKey } from './index'
import type { RC } from './index'

// @todo(types) any
function setCache({ data, slug }: { data: RC | any; slug: string }) {
  const key = getKey(slug)
  void redis.set(key, stringify(data), {
    ex: TIME.MONTH,
  })
  return null
}

export { setCache }
