import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Redis } from '@upstash/redis'

type RC = {
  blocks: ListBlockChildrenResponse
  page: PageObjectResponse
}

import redis from './redis'

export { getCache } from './getCache'
export { getKey } from './getKey'
export { setCache } from './setCache'

export type { RC, Redis }
export default redis
