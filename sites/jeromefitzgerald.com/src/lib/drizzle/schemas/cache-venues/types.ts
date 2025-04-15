import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  PeoplePropertyItemObjectResponse,
  PhoneNumberPropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type { Spread } from '@/lib/drizzle/schemas/_notion/types'
import type { Cache } from '@/lib/drizzle/schemas/helpers.types'

export type NotionPageObjectResponseVenue = Spread<
  [PageObjectResponse, { properties: NotionPropertiesVenue }]
>
export interface NotionPropertiesVenue {
  'Address.City': RichTextPropertyItemObjectResponse
  'Address.Latitude': NumberPropertyItemObjectResponse
  'Address.Longitude': NumberPropertyItemObjectResponse
  'Address.Neighborhood': RichTextPropertyItemObjectResponse
  'Address.PostalCode': NumberPropertyItemObjectResponse
  'Address.State': RichTextPropertyItemObjectResponse
  'Address.Street': RichTextPropertyItemObjectResponse
  Authors: PeoplePropertyItemObjectResponse
  'Date.Published': DatePropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Is.Indexed': CheckboxPropertyItemObjectResponse
  'Is.Published': CheckboxPropertyItemObjectResponse
  Phone: PhoneNumberPropertyItemObjectResponse
  'Relation.Episodes': RelationPropertyItemObjectResponse
  'Relation.Events': RelationPropertyItemObjectResponse
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
  'Social.Website': UrlPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}

export type CacheVenue = {
  addressCity: any
  addressLatitude: any
  addressLongitude: any
  addressNeighborhood: any
  addressPostalCode: any
  addressState: any
  addressStreet: any
  authors: any
  datePublished: any
  id: any
  isIndexed: boolean
  isPublished: boolean
  phone: any
  relationEpisodes: any
  relationEvents: any
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
  slug: any
  slugPreview: any
  socialBluesky: any
  socialFacebook: any
  socialInstagram: any
  socialTwitter: any
  socialWebsite: any
  title: any
}

export type Venue = Cache & CacheVenue
