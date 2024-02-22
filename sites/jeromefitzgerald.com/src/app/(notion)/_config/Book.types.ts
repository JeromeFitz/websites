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

type PropertiesBook = {
  Author: RichTextPropertyItemObjectResponse
  'Date.Published': DatePropertyItemObjectResponse
  'Date.Read': DatePropertyItemObjectResponse
  'Date.Released': DatePropertyItemObjectResponse
  'Date.Released.ISO': FormulaPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'ISBN-10': RichTextPropertyItemObjectResponse
  'ISBN-13': RichTextPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.HouseTeam': CheckboxPropertyItemObjectResponse
  'Is.HouseTeam.Past': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
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
  'URL.Biblio': UrlPropertyItemObjectResponse
  'URL.Bookshop': UrlPropertyItemObjectResponse
  'URL.Goodreads': UrlPropertyItemObjectResponse
}
type PageObjectResponseBook = Spread<
  [PageObjectResponse, { properties: PropertiesBook }]
>

export type { PageObjectResponseBook, PropertiesBook }
