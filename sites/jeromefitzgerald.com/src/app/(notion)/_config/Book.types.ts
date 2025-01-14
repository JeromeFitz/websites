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
import type { Spread } from 'next-notion/Notion.types'

type PageObjectResponseBook = Spread<
  [PageObjectResponse, { properties: PropertiesBook }]
>
interface PropertiesBook {
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

export type { PageObjectResponseBook, PropertiesBook }
