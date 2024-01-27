import type {
  CheckboxPropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/Notion.types'

type PropertiesPage = {
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Select.Test': SelectPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponsePage = Spread<
  [PageObjectResponse, { properties: PropertiesPage }]
>

export type { PageObjectResponsePage, PropertiesPage }
