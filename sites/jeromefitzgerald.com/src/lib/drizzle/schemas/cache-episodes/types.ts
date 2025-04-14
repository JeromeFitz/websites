import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  PeoplePropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponseEpisode = Spread<
  [PageObjectResponse, { properties: NotionPropertiesEpisode }]
>
export interface NotionPropertiesEpisode {
  Authors: PeoplePropertyItemObjectResponse
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
  'Date.Recorded': any
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
  'Meta.Duration': NumberPropertyItemObjectResponse
  'Meta.Episode': NumberPropertyItemObjectResponse
  'Meta.MP3': UrlPropertyItemObjectResponse
  'Meta.Season': NumberPropertyItemObjectResponse
  'Meta.Sort': FormulaPropertyItemObjectResponse
  'Meta.Spotify.ID': RichTextPropertyItemObjectResponse
  'Meta.Spotify.URL': UrlPropertyItemObjectResponse
  'Meta.Time': RichTextPropertyItemObjectResponse
  'Meta.Time.Duration': FormulaPropertyItemObjectResponse
  'Meta.Time.Hours': FormulaPropertyItemObjectResponse
  'Meta.Time.Minutes': FormulaPropertyItemObjectResponse
  'Meta.Time.Seconds': FormulaPropertyItemObjectResponse
  'Meta.Time.Valid': FormulaPropertyItemObjectResponse
  'Meta.Type': SelectPropertyItemObjectResponse
  'Relation.People.Guest': RelationPropertyItemObjectResponse
  'Relation.People.SoundEngineer': RelationPropertyItemObjectResponse
  'Relation.People.Thanks': RelationPropertyItemObjectResponse
  'Relation.Podcasts': RelationPropertyItemObjectResponse
  'Relation.Venues': RelationPropertyItemObjectResponse
  'Rollup.People.Guest.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Host.Title': RollupPropertyItemObjectResponse
  'Rollup.People.SoundEngineer.Title': RollupPropertyItemObjectResponse
  'Rollup.People.Thanks.Title': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Apple.ID': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Apple.URL': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Slug': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Spotify.ID': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Spotify.URL': RollupPropertyItemObjectResponse
  'Rollup.Podcasts.Title': RollupPropertyItemObjectResponse
  'Rollup.Venues.Slug': RollupPropertyItemObjectResponse
  'Rollup.Venues.Title': RollupPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Subtitle: RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}

export type CacheEpisode = {
  authors: string
  date: string
  dateDayOfMonth: string
  dateDayOfMonthOrdinal: string
  dateDayOfWeek: string
  dateDayOfWeekAbbr: string
  dateDaysUntilEvent: any
  dateHoursUntilEvent: any
  dateIso: string
  dateMonth: string
  dateMonthName: string
  dateMonthNameAbbr: string
  datePublished: string
  dateRecorded: string
  dateTime: string
  dateTimeZone: string
  dateWeekNumber: string
  dateYear: string
  id: string
  isActive: boolean
  isExplicit: boolean
  isIndexed: boolean
  isPublished: boolean
  metaAppleId: string
  metaAppleUrl: string
  metaDuration: string
  metaEpisode: string
  metaMp3: string
  metaSeason: string
  metaSort: string
  metaSpotifyId: string
  metaSpotifyUrl: string
  metaTime: string
  metaTimeDuration: string
  metaTimeHours: string
  metaTimeMinutes: string
  metaTimeSeconds: string
  metaTimeValid: string
  metaType: string
  relationPeopleGuest: string
  relationPeopleSoundengineer: string
  relationPeopleThanks: string
  relationPodcasts: string
  relationVenues: string
  rollupPeopleGuestTitle: string
  rollupPeopleHostTitle: string
  rollupPeopleSoundengineerTitle: string
  rollupPeopleThanksTitle: string
  rollupPodcastsAppleId: string
  rollupPodcastsAppleUrl: string
  rollupPodcastsSlug: string
  rollupPodcastsSpotifyId: string
  rollupPodcastsSpotifyUrl: string
  rollupPodcastsTitle: string
  rollupVenuesSlug: string
  rollupVenuesTitle: string
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
  subtitle: string
  title: string
}

export type Episode = Cache & CacheEpisode
