import type {
  CheckboxPropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Spread } from 'next-notion/Notion.types'

interface PropertiesPage {
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Select.Test': SelectPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponsePage = Spread<
  [PageObjectResponse, { properties: PropertiesPage }]
>

export type { PageObjectResponsePage, PropertiesPage }
