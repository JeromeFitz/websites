import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  // NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  // RollupPropertyItemObjectResponse,
  // SelectPropertyItemObjectResponse,
  // StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  // UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/src/Notion.types'

type PropertiesPodcast = {
  'Date.DayOfMonth': FormulaPropertyItemObjectResponse
  'Date.DayOfMonthOrdinal': FormulaPropertyItemObjectResponse
  'Date.DayOfWeek': FormulaPropertyItemObjectResponse
  'Date.DayOfWeekAbbr': FormulaPropertyItemObjectResponse
  'Date.DaysUntilEvent': FormulaPropertyItemObjectResponse
  'Date.HoursUntilEvent': FormulaPropertyItemObjectResponse
  'Date.ISO': FormulaPropertyItemObjectResponse
  'Date.Month': FormulaPropertyItemObjectResponse
  'Date.MonthName': FormulaPropertyItemObjectResponse
  'Date.MonthNameAbbr': FormulaPropertyItemObjectResponse
  'Date.Time': FormulaPropertyItemObjectResponse
  'Date.Timezone': FormulaPropertyItemObjectResponse
  'Date.WeekNumber': FormulaPropertyItemObjectResponse
  'Date.Year': FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Relation.People.Guests': RelationPropertyItemObjectResponse
  'Relation.People.HouseManager': RelationPropertyItemObjectResponse
  'Relation.People.Interns': RelationPropertyItemObjectResponse
  'Relation.People.StageManager': RelationPropertyItemObjectResponse
  'Relation.Shows.Music': RelationPropertyItemObjectResponse
  'Relation.Shows.Primary': RelationPropertyItemObjectResponse
  'Relation.Shows.Supporting': RelationPropertyItemObjectResponse
  'Relation.Venues': RelationPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponsePodcast = Spread<
  [PageObjectResponse, { properties: PropertiesPodcast }]
>

export type { PageObjectResponsePodcast, PropertiesPodcast }
