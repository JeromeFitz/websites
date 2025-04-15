import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  PageObjectResponse,
  PeoplePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponsePage = Spread<
  [PageObjectResponse, { properties: NotionPropertiesPage }]
>
export interface NotionPropertiesPage {
  Authors: PeoplePropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Notion': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  // 'Select.Test': SelectPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}

export type CachePage = {
  authors: string
  date: string
  id: string
  isActive: boolean
  isIndexed: boolean
  isNotion: boolean
  isPublished: boolean
  seoDescription: string
  seoImage: {
    file: {
      expiry_time: string
      url: string
    }
    name: string
    type: string
  }
  seoImageDescription: string
  slug: string
  slugPreview: string
  title: string
}

export type Page = Cache & CachePage
