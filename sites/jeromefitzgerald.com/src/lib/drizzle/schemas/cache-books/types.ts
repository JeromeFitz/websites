import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponseBook = Spread<
  [PageObjectResponse, { properties: NotionPropertiesBook }]
>
export type NotionPropertiesBook = {
  Author: RichTextPropertyItemObjectResponse
  'Date.Published': DatePropertyItemObjectResponse
  'Date.Read': DatePropertyItemObjectResponse
  'Date.Released': DatePropertyItemObjectResponse
  'Date.Released.ISO': FormulaPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Bookshop': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'ISBN-10': any
  'ISBN-13': any
  'ISBN-13.Hard': NumberPropertyItemObjectResponse
  'ISBN-13.Soft': NumberPropertyItemObjectResponse
  Pages: RichTextPropertyItemObjectResponse
  Publisher: NumberPropertyItemObjectResponse
  'Relation.Events': RelationPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Status: StatusPropertyItemObjectResponse
  Subtitle: RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  'URL.Amazon': UrlPropertyItemObjectResponse
  'URL.Biblio': FormulaPropertyItemObjectResponse
  'URL.Bookshop': FormulaPropertyItemObjectResponse
  'URL.Goodreads': UrlPropertyItemObjectResponse
}

export type CacheBook = {
  author: string
  datePublished: string
  dateRead: string
  dateReleased: string
  dateReleasedISO: string
  id: string
  isActive: string
  isbn10: string
  isbn13: string
  isbn13hard: string
  isbn13soft: string
  isBookshop: boolean
  isIndexed: boolean
  isPublished: boolean
  pages: string
  publisher: string
  seoDescription: string
  seoImage: {
    file: {
      expiry_time: string
      url: string
    }
    name: string
    type: 'file'
  }
  seoImageDescription: string
  slug: string
  slugPreview: string
  status: string
  status_color: string
  subtitle: string
  title: string
  urlAmazon: string
  urlBiblio: string
  urlBookshop: string
  urlGoodreads: string
}

export type CacheBookCustom = {
  insertedAt: string
  insertedAtET: string
  insertedAtPT: string
  insertedAtUTC: string
  pid: number
}

// export type Book = BookCache & CacheBook
export type Book = Cache & CacheBook & CacheBookCustom

export type BookStatus = 'Complete' | 'In Progress' | 'Pending'
