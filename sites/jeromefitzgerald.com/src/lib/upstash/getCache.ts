import 'server-only'

import type { RC } from './index'

import { getKey, redis } from './index'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  const cache = await redis.get<RC>(key)
  return cache
}

export { getCache }
