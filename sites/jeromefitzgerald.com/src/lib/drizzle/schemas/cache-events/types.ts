import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  // NumberPropertyItemObjectResponse,
  PageObjectResponse,
  PeoplePropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponseEvent = Spread<
  [PageObjectResponse, { properties: NotionPropertiesEvent }]
>
export interface NotionPropertiesEvent {
  Authors: PeoplePropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  'Date.Created': DatePropertyItemObjectResponse
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
  'Date.TimeZone': FormulaPropertyItemObjectResponse
  'Date.WeekNumber': FormulaPropertyItemObjectResponse
  'Date.Year': FormulaPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
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
  'Rollup.Shows.Supporting.Title': RollupPropertyItemObjectResponse
  'Rollup.Shows.Type': RollupPropertyItemObjectResponse
  'Rollup.Venues.Slug': RollupPropertyItemObjectResponse
  'Rollup.Venues.Title': RollupPropertyItemObjectResponse
  Segment: SelectPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  'Slug.Preview.ET': FormulaPropertyItemObjectResponse
  'Slug.Preview.Override': FormulaPropertyItemObjectResponse
  'Slug.Preview.UTC': FormulaPropertyItemObjectResponse
  'Social.Facebook': UrlPropertyItemObjectResponse
  Stage: SelectPropertyItemObjectResponse
  Status: StatusPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  // 'Tickets.Attended': NumberPropertyItemObjectResponse
  'URL.Theater': UrlPropertyItemObjectResponse
  'URL.Ticket': UrlPropertyItemObjectResponse
}
export type CacheEvent = {
  authors: string
  date: string
  dateCreated: string
  dateDayOfMonth: string
  dateDayOfMonthOrdinal: string
  dateDayOfWeek: string
  dateDayOfWeekAbbr: string
  dateDaysUntilEvent: string
  dateHoursUntilEvent: string
  dateIso: string
  dateMonth: string
  dateMonthName: string
  dateMonthNameAbbr: string
  datePublished: string
  dateTime: string
  dateTimeZone: string
  dateWeekNumber: string
  dateYear: string
  id: string
  isIndexed: boolean
  isPublished: boolean
  overrideSlug: string
  overrideTags: string
  overrideTitle: string
  relationPeopleGuests: any
  relationPeopleHouseManager: any
  relationPeopleInterns: any
  relationPeopleStageManager: any
  relationShowsMusic: any
  relationShowsPrimary: any
  relationShowsSupporting: any
  relationVenues: any
  rollupPeopleGuestTitle: any
  rollupShowsComplexity: any
  rollupShowsMusicTitle: any
  rollupShowsPrimaryCastTitle: any
  rollupShowsPrimarySlug: any
  rollupShowsPrimaryTags: any
  rollupShowsPrimaryTitle: any
  rollupShowsProducerTitle: any
  rollupShowsSupportingTags: any
  rollupShowsSupportingTitle: any
  rollupVenuesSlug: any
  rollupVenuesTitle: any
  segment: string
  seoDescription: string
  seoImage: {
    file: {
      expiry_time: string
      url: string
    }
    name: string
    type: string
  }
  seoImageDescription: string
  seoKeywords: string
  slug: string
  slugPreview: string
  slugPreviewEt: string
  slugPreviewOverride: string
  slugPreviewUtc: string
  socialFacebook: string
  tags: any
  title: string
  urlTheater: string
  urlTicket: string
}

export type Event = Cache & CacheEvent
