import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

type RC = {
  page: PageObjectResponse
  blocks: ListBlockChildrenResponse
}

import redis from './redis'

export { getCache } from './getCache'
export { getKey } from './getKey'
export { setCache } from './setCache'

export type { RC }
export default redis
