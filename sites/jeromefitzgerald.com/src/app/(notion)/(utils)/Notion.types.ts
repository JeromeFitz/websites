import type {
  BlockObjectResponse,
  PartialUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

import type { PageObjectResponseEvent } from '~app/(notion)/events/[[...catchAll]]/Event.types'
import type { PageObjectResponsePerson } from '~app/(notion)/people/[[...catchAll]]/Person.types'
import type { PageObjectResponseShow } from '~app/(notion)/shows/[[...catchAll]]/Show.types'

// @todo(types) Can this extend all of them instead?
type PageObjectResponseCustom =
  | PageObjectResponseEvent
  | PageObjectResponsePerson
  | PageObjectResponseShow

/**
 * @note(typescript) we need to take over the Notion returns
 * @ref:
 */
type OptionalPropertyNames<T> = {
  [K in keyof T]-?: object extends { [P in K]: T[K] } ? K : never
}[keyof T]

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>
}

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>

type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown
/**
 *
 */
type Direction = 'ascending' | 'descending'
type SortItem = {
  property: string
  direction: Direction
}
type FilterType =
  | 'equals'
  | 'does_not_equal'
  | 'contains'
  | 'does_not_contain'
  | 'starts_with'
  | 'ends_with'

type BulletedListBlockObjectResponse = {
  type: 'bulleted_list'
  bulleted_list: any
  parent:
    | { type: 'database_id'; database_id: string }
    | { type: 'page_id'; page_id: string }
    | { type: 'block_id'; block_id: string }
    | { type: 'workspace'; workspace: true }
  object: 'block'
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
}
type NumberedListBlockObjectResponse = {
  type: 'numbered_list'
  numbered_list: any
  parent:
    | { type: 'database_id'; database_id: string }
    | { type: 'page_id'; page_id: string }
    | { type: 'block_id'; block_id: string }
    | { type: 'workspace'; workspace: true }
  object: 'block'
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
}

type BlockObjectResponseCustom =
  | BlockObjectResponse
  | BulletedListBlockObjectResponse
  | NumberedListBlockObjectResponse

export type {
  BlockObjectResponseCustom,
  Direction,
  FilterType,
  PageObjectResponseCustom,
  SortItem,
  Spread,
}
