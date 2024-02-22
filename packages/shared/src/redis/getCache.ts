import 'server-only'

// import type { RC } from './index'

import redis, { getKey } from './index'

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug)
  /**
   * @todo(types) Untyped function calls may not accept type arguments
   */
  // const cache = await redis.get<RC>(key)
  const cache = await redis.get(key)
  return cache
}

export { getCache }
