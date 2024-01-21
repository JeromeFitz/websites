import 'server-only'

import redis, { getKey } from './index'
import type { RC } from './index'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

export { getCache }
