import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

export type CacheInit = {
  id: number
  uuid: string
  siteId: number
  key: string
  value: ListBlockChildrenResponse[]
  // value: any
}

export type CacheTimestamps = {
  insertedAt: Date
  updatedAt: Date
}

export type Cache = CacheInit & CacheTimestamps
