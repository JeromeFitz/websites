// import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import type { Cache } from '../helpers.types'

export type CacheBlock = {
  results: any
}

export type Block = Cache & CacheBlock
