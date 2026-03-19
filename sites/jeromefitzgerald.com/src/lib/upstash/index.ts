import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

interface RC {
  blocks: ListBlockChildrenResponse
  page: PageObjectResponse
}

export { getCache } from './getCache'
export { getKey } from './getKey'
export { redis } from './redis'
export { setCache } from './setCache'

export type { RC }
