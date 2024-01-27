import type { RC } from './index'

import redis, { getKey } from './index'

import 'server-only'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

export { getCache }
