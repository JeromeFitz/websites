import type {
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/Notion.types'

type PropertiesVenue = {
  'Address.City': RichTextPropertyItemObjectResponse
  'Address.Latitude': NumberPropertyItemObjectResponse
  'Address.Longitude': NumberPropertyItemObjectResponse
  'Address.Neighborhood': RichTextPropertyItemObjectResponse
  'Address.PostalCode': NumberPropertyItemObjectResponse
  'Address.State': RichTextPropertyItemObjectResponse
  'Address.Street': RichTextPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Relation.Events': RelationPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponseVenue = Spread<
  [PageObjectResponse, { properties: PropertiesVenue }]
>

export type { PageObjectResponseVenue, PropertiesVenue }
