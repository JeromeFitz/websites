import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  // MultiSelectPropertyItemObjectResponse,
  // NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  // StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/src/Notion.types'

type PropertiesEpisode = {
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
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Explicit': CheckboxPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  'Meta.Apple.ID': RichTextPropertyItemObjectResponse
  'Meta.Apple.URL': UrlPropertyItemObjectResponse
  'Meta.Duration': UrlPropertyItemObjectResponse
  'Meta.Episode': NumberPropertyItemObjectResponse
  'Meta.MP3': UrlPropertyItemObjectResponse
  'Meta.Season': NumberPropertyItemObjectResponse
  'Meta.Spotify.ID': RichTextPropertyItemObjectResponse
  'Meta.Spotify.URL': UrlPropertyItemObjectResponse
  'Meta.Time.Duration': FormulaPropertyItemObjectResponse
  'Meta.Time.Hours': FormulaPropertyItemObjectResponse
  'Meta.Time.Minutes': FormulaPropertyItemObjectResponse
  'Meta.Time.Seconds': FormulaPropertyItemObjectResponse
  'Meta.Time.Valid': FormulaPropertyItemObjectResponse
  'Meta.Time': RichTextPropertyItemObjectResponse
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
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  //
  Subtitle: RichTextPropertyItemObjectResponse
}
type PageObjectResponseEpisode = Spread<
  [PageObjectResponse, { properties: PropertiesEpisode }]
>

export type { PageObjectResponseEpisode, PropertiesEpisode }
