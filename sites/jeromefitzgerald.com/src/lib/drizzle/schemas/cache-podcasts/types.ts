import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponsePodcast = Spread<
  [PageObjectResponse, { properties: NotionPropertiesPodcast }]
>
export interface NotionPropertiesPodcast {
  Author: RichTextPropertyItemObjectResponse
  'Author.Email': RichTextPropertyItemObjectResponse
  Categories: MultiSelectPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  'Date.DayOfMonth': FormulaPropertyItemObjectResponse
  'Date.DayofMonth': any
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
  'Rollup.Episodes.SlugPreview': RollupPropertyItemObjectResponse
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

export type CachePodcast = {
  author: any
  authorEmail: any
  dateDayOfMonth: any
  dateDayOfMonthOrdinal: any
  dateDayOfWeek: any
  dateDayOfWeekAbbr: any
  dateDaysUntilEvent: any
  dateHoursUntilEvent: any
  dateIso: any
  dateMonth: any
  dateMonthName: any
  dateMonthNameAbbr: any
  datePublished: any
  dateTime: any
  dateTimezone: any
  dateWeekNumber: any
  dateYear: any
  id: any
  isActive: boolean
  isExplicit: boolean
  isIndexed: boolean
  isPublished: boolean
  metaAppleId: any
  metaAppleUrl: any
  metaSpotifyId: any
  metaSpotifyUrl: any
  relationEpisodes: any
  relationPeopleHost: any
  relationPeopleProducer: any
  relationPeopleThanks: any
  rollupEpisodesSlug: any
  rollupEpisodesSlugPreview: any
  rollupEpisodesTitle: any
  rollupPeopleHostTitle: any
  rollupPeopleProducerTitle: any
  rollupPeopleThanksTitle: any
  seoDescription: any
  seoImage: {
    file: {
      expiry_time: string
      url: string
    }
    name: string
    type: string
  }
  seoImageDescription: any
  seoKeywords: any
  slugPreview: any
  title: any
  type: any
}

export type Podcast = Cache & CachePodcast
