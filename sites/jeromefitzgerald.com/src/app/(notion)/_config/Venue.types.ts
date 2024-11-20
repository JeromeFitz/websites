import type {
  FormulaPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  PageObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Spread } from 'next-notion/Notion.types'

type PageObjectResponseVenue = Spread<
  [PageObjectResponse, { properties: PropertiesVenue }]
>
interface PropertiesVenue {
  'Address.City': RichTextPropertyItemObjectResponse
  'Address.Latitude': NumberPropertyItemObjectResponse
  'Address.Longitude': NumberPropertyItemObjectResponse
  'Address.Neighborhood': RichTextPropertyItemObjectResponse
  'Address.PostalCode': NumberPropertyItemObjectResponse
  'Address.State': RichTextPropertyItemObjectResponse
  'Address.Street': RichTextPropertyItemObjectResponse
  // @todo(notion) deprecate field for Address.PostalCode
  'Address.ZipCode': NumberPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  'Relation.Events': RelationPropertyItemObjectResponse
  'Slug.Preview': RichTextPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}

export type { PageObjectResponseVenue, PropertiesVenue }
