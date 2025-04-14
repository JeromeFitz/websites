import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
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

export type NotionPageObjectResponseShow = Spread<
  [PageObjectResponse, { properties: NotionPropertiesShow }]
>
export interface NotionPropertiesShow {
  Authors: PeoplePropertyItemObjectResponse
  Complexity: SelectPropertyItemObjectResponse
  Date: DatePropertyItemObjectResponse
  Festival: MultiSelectPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Active': CheckboxPropertyItemObjectResponse
  'Is.Featured': CheckboxPropertyItemObjectResponse
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
  'Relation.Tags': RelationPropertyItemObjectResponse
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
  'Rollup.Tags': RollupPropertyItemObjectResponse
  'SEO.Description': RichTextPropertyItemObjectResponse
  'SEO.Image': FilesPropertyItemObjectResponse
  'SEO.Image.Description': RichTextPropertyItemObjectResponse
  'SEO.Keywords': RichTextPropertyItemObjectResponse
  Slug: RichTextPropertyItemObjectResponse
  'Slug.Preview': FormulaPropertyItemObjectResponse
  'Social.Bluesky': UrlPropertyItemObjectResponse
  'Social.Facebook': UrlPropertyItemObjectResponse
  'Social.Instagram': UrlPropertyItemObjectResponse
  'Social.Twitter': UrlPropertyItemObjectResponse
  Tags: MultiSelectPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
  Type: SelectPropertyItemObjectResponse
}

export type CacheShow = {
  authors: any
  complexity: any
  date: string
  id: string
  isActive: boolean
  isFeatured: boolean
  isHouseTeam: boolean
  isHouseTeamPast: boolean
  isIndexed: boolean
  isPublished: boolean
  isRecurring: boolean
  relationPeopleGuests: any
  relationShowsMusic: any
  relationShowsPrimary: any
  relationShowsSupporting: any
  relationVenues: any
  rollupPeopleGuestTitle: any
  rollupShowsMusicTitle: any
  rollupShowsPrimaryCastTitle: any
  rollupShowsPrimarySlug: any
  rollupShowsPrimaryTags: any
  rollupShowsPrimaryTitle: any
  rollupShowsSupportingTags: any
  rollupShowsSupportingTitle: any
  rollupVenuesSlug: any
  rollupVenuesTitle: any
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
  slug: string
  slugPreview: string
  slugPreviewEt: string
  slugPreviewOverride: string
  slugPreviewUtc: string
  socialBluesky: string
  socialFacebook: string
  socialInstgram: string
  socialTwitter: string
  tags: any
  title: string
  urlTheater: string
  urlTicket: string
}

export type Show = Cache & CacheShow
