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
  StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/src/Notion.types'

type PropertiesEvent = {
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
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Override.Slug': CheckboxPropertyItemObjectResponse
  'Override.Tags': CheckboxPropertyItemObjectResponse
  'Override.Title': CheckboxPropertyItemObjectResponse
  // 'Payout.Amount': NumberPropertyItemObjectResponse
  // 'Payout.Gross.Profit': FormulaPropertyItemObjectResponse
  // 'Payout.Ticket.Sales': NumberPropertyItemObjectResponse
  'Relation.People.Guests': RelationPropertyItemObjectResponse
  'Relation.People.HouseManager': RelationPropertyItemObjectResponse
  'Relation.People.Interns': RelationPropertyItemObjectResponse
  'Relation.People.StageManager': RelationPropertyItemObjectResponse
  'Relation.Shows.Music': RelationPropertyItemObjectResponse
  'Relation.Shows.Primary': RelationPropertyItemObjectResponse
  'Relation.Shows.Supporting': RelationPropertyItemObjectResponse
  'Relation.Venues': RelationPropertyItemObjectResponse
  'Rollup.People.Guest.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Complexity': RollupPropertyItemObjectResponse
  'Rollup.Shows.Music.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Primary.Cast.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Primary.Slug': RollupPropertyItemObjectResponse
  'Rollup.Shows.Primary.Tags': RollupPropertyItemObjectResponse
  'Rollup.Shows.Primary.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Producer.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Supporting.Tags': RollupPropertyItemObjectResponse
  'Rollup.Shows.Type': RollupPropertyItemObjectResponse
  'Rollup.Venues.Slug': RollupPropertyItemObjectResponse
  'Rollup.Venues.Title': RollupPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  // 'Slug.Preview.Override': FormulaPropertyItemObjectResponse
  // 'Tickets.Attended': NumberPropertyItemObjectResponse
  'URL.Ticket': UrlPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  Stage: SelectPropertyItemObjectResponse
  Status: StatusPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponseEvent = Spread<
  [PageObjectResponse, { properties: PropertiesEvent }]
>

export type { PageObjectResponseEvent, PropertiesEvent }
