import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

type RC = {
  page: PageObjectResponse
  blocks: ListBlockChildrenResponse
}

import redis from './redis.js'

export { getCache } from './getCache.js'
export { getKey } from './getKey.js'
export { setCache } from './setCache.js'

export type { RC }
export default redis
