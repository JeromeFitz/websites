/* eslint-disable perfectionist/sort-object-types */
import type { Cache } from '../helpers.types'

type CacheImageValue = {
  key: string
  blurDataUrl: string
  src: string
  slug: string
  width: string
  height: string
}

export type CacheInit2 = {
  id: number
  key: string
  value: CacheImageValue[]
}

export type CacheImageCustom = {
  blurDataUrl: string
  slug: string
  src: string
  width: string
  height: string
}

export type CacheImage = Cache & CacheImageCustom
