import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  EmailPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  PhoneNumberPropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/Notion.types'

interface PropertiesPerson {
  Date: DatePropertyItemObjectResponse
  Email: EmailPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  // 'Is.OkayToText': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  Phone: PhoneNumberPropertyItemObjectResponse
  Pronouns: SelectPropertyItemObjectResponse
  'Relation.Episodes.Guest': RelationPropertyItemObjectResponse
  'Relation.Episodes.SoundEngineer': RelationPropertyItemObjectResponse
  'Relation.Episodes.Thanks': RelationPropertyItemObjectResponse
  'Relation.Events.Guest': RelationPropertyItemObjectResponse
  'Relation.Events.HouseManager': RelationPropertyItemObjectResponse
  'Relation.Events.Interns': RelationPropertyItemObjectResponse
  'Relation.Events.Music': RelationPropertyItemObjectResponse
  'Relation.Events.Primary': RelationPropertyItemObjectResponse
  'Relation.Events.StageManager': RelationPropertyItemObjectResponse
  'Relation.Events.Supporting': RelationPropertyItemObjectResponse
  'Relation.Podcasts.Host': RelationPropertyItemObjectResponse
  'Relation.Podcasts.Producer': RelationPropertyItemObjectResponse
  'Relation.Podcasts.Thanks': RelationPropertyItemObjectResponse
  'Relation.Shows.Cast': RelationPropertyItemObjectResponse
  'Relation.Shows.Cast.Past': RelationPropertyItemObjectResponse
  'Relation.Shows.Crew': RelationPropertyItemObjectResponse
  'Relation.Shows.Director': RelationPropertyItemObjectResponse
  'Relation.Shows.Director.Musical': RelationPropertyItemObjectResponse
  'Relation.Shows.Director.Technical': RelationPropertyItemObjectResponse
  'Relation.Shows.Music': RelationPropertyItemObjectResponse
  'Relation.Shows.Producer': RelationPropertyItemObjectResponse
  'Relation.Shows.Thanks': RelationPropertyItemObjectResponse
  'Relation.Shows.Writer': RelationPropertyItemObjectResponse
  Roles: MultiSelectPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponsePerson = Spread<
  [PageObjectResponse, { properties: PropertiesPerson }]
>
export type { PageObjectResponsePerson, PropertiesPerson }
