import type {
  CheckboxPropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Spread } from 'next-notion/Notion.types'

type PropertiesShow = {
  Complexity: SelectPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.HouseTeam': CheckboxPropertyItemObjectResponse
  'Is.HouseTeam.Past': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Is.Recurring': CheckboxPropertyItemObjectResponse
  'Relation.Events.Primary': RelationPropertyItemObjectResponse
  'Relation.Events.Supporting': RelationPropertyItemObjectResponse
  'Relation.People.Cast': RelationPropertyItemObjectResponse
  'Relation.People.Cast.Past': RelationPropertyItemObjectResponse
  'Relation.People.Crew': RelationPropertyItemObjectResponse
  'Relation.People.Director': RelationPropertyItemObjectResponse
  'Relation.People.Director.Musical': RelationPropertyItemObjectResponse
  'Relation.People.Director.Technical': RelationPropertyItemObjectResponse
  'Relation.People.Music': RelationPropertyItemObjectResponse
  'Relation.People.Producer': RelationPropertyItemObjectResponse
  'Relation.People.Thanks': RelationPropertyItemObjectResponse
  'Relation.People.Writer': RelationPropertyItemObjectResponse
  'Rollup.People.Cast.Past.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Cast.Slug': RollupPropertyItemObjectResponse
  'Rollup.People.Cast.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Crew.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Director.Musical.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Director.Technical.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Director.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Music.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Producer.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Thanks.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Writer.Title': RollupPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  Type: SelectPropertyItemObjectResponse
}
type PageObjectResponseShow = Spread<
  [PageObjectResponse, { properties: PropertiesShow }]
>

export type { PageObjectResponseShow, PropertiesShow }
