import type {
  CheckboxPropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/src/Notion.types'

type PropertiesPage = {
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Select.Test': SelectPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponsePage = Spread<
  [PageObjectResponse, { properties: PropertiesPage }]
>

export type { PageObjectResponsePage, PropertiesPage }
