import 'server-only'
import https from 'node:https'

import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

import { getKey } from './index'
import type { RC } from './index'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

export { getCache }
