import type {
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Spread } from 'next-notion/Notion.types'

type PropertiesVenue = {
  'Address.City': RichTextPropertyItemObjectResponse
  'Address.Latitude': NumberPropertyItemObjectResponse
  'Address.Longitude': NumberPropertyItemObjectResponse
  'Address.Neighborhood': RichTextPropertyItemObjectResponse
  'Address.PostalCode': NumberPropertyItemObjectResponse
  'Address.State': RichTextPropertyItemObjectResponse
  'Address.Street': RichTextPropertyItemObjectResponse
  'Relation.Events': RelationPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponseVenue = Spread<
  [PageObjectResponse, { properties: PropertiesVenue }]
>

export type { PageObjectResponseVenue, PropertiesVenue }
