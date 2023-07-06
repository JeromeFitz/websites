import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

type RC = {
  page: PageObjectResponse
  blocks: ListBlockChildrenResponse
}

export { getCache } from './getCache'
export { getDataFromCache } from './getDataFromCache'
export { getKey } from './getKey'
export { setCache } from './setCache'

export type { RC }
