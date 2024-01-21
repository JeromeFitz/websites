import 'server-only'

import redis, { getKey } from './index.js'
import type { RC } from './index.js'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

export { getCache }
