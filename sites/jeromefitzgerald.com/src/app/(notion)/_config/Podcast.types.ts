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
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  // StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Spread } from 'next-notion/Notion.types'

type PageObjectResponsePodcast = Spread<
  [PageObjectResponse, { properties: PropertiesPodcast }]
>
interface PropertiesPodcast {
  //
  Author: RichTextPropertyItemObjectResponse
  'Author.Email': RichTextPropertyItemObjectResponse
  Categories: MultiSelectPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
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
  'Date.Published': DatePropertyItemObjectResponse
  'Date.Time': FormulaPropertyItemObjectResponse
  'Date.Timezone': FormulaPropertyItemObjectResponse
  'Date.WeekNumber': FormulaPropertyItemObjectResponse
  'Date.Year': FormulaPropertyItemObjectResponse
  Explicit: CheckboxPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Explicit': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Meta.Apple.ID': RichTextPropertyItemObjectResponse
  'Meta.Apple.URL': UrlPropertyItemObjectResponse
  'Meta.Spotify.ID': RichTextPropertyItemObjectResponse
  'Meta.Spotify.URL': UrlPropertyItemObjectResponse
  'Relation.Episodes': RelationPropertyItemObjectResponse
  'Relation.People.Host': RelationPropertyItemObjectResponse
  'Relation.People.Producer': RelationPropertyItemObjectResponse
  'Relation.People.Thanks': RelationPropertyItemObjectResponse
  'Rollup.Episodes.Slug': RollupPropertyItemObjectResponse
  'Rollup.Episodes.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Host.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Producer.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Thanks.Title': RollupPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Subtitle: RichTextPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  Type: SelectPropertyItemObjectResponse
}

export type { PageObjectResponsePodcast, PropertiesPodcast }
