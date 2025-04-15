interface NotionText {
  annotations: {
    bold: boolean
    code: boolean
    color: string
    italic: boolean
    strikethrough: boolean
    underline: boolean
  }
  href: string
  plain_text: string
  text: {
    content: string
    link: any
  }
  type: string
}

interface NotionSeoImage {
  'SEO.Image': any
  'Slug.Preview': any
}
/**
 * @types(notion) need to lift because they are not exposed
 */
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
type OptionalPropertyNames<T> = {
  [K in keyof T]-?: object extends Record<K, T[K]> ? K : never
}[keyof T]

type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown
type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: Exclude<R[P], undefined> | L[P]
}
type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, keyof L & OptionalPropertyNames<R>>
>

type NotionColor =
  | 'amber'
  | 'blue'
  | 'bronze'
  | 'brown'
  | 'crimson'
  | 'cyan'
  | 'gold'
  | 'grass'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'iris'
  | 'jade'
  | 'lime'
  | 'mint'
  | 'orange'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'red'
  | 'ruby'
  | 'sky'
  | 'teal'
  | 'tomato'
  | 'violet'
  | 'yellow'

type NotionTag = {
  color: NotionColor
  id: string
  name: string
}

export type { NotionColor, NotionSeoImage, NotionTag, NotionText, Spread }
