/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @note Items = RouteType Data, which can vary based on Schema
 */
export type ItemBase = {
  Authors: string
  columns: any
  content: Content[]
  'Date.Published': any
  Date: any
  id: string
  NextLink: any
  NoIndex: string
  preview: any
  Published: string
  routeType: string
  'SEO.Description': string
  'SEO.Image.Description': string
  'SEO.Image': string
  Slug: string
  Title: string
}

// export type ContentHeadline = {
//   headline: any,
//   overline: any,
//   subline: any
// }

export interface ItemBlog extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  Tags: any
}

export interface ItemEpisode extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  'Date.Recorded': any
  Duration: any
  Episode: any
  Explicit: any
  MP3: any
  'People.Guest': any
  'People.SoundEngineer': any
  'People.Thanks': any
  PodcastIDs: any
  Season: any
  Tags: any
  Type: any
  'Venues.RecordedAt': any
}

export interface ItemEvent extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  ShowIDs: any
  'Social.Facebook': any
  TicketUrl: any
  Tags: any
  VenueIDs: any
}

export interface ItemPerson extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  'Episodes.People.Guest': any
  'Episodes.People.SoundEngineer': any
  'Episodes.People.Thanks': any
  'Podcasts.People.Host': any
  'Shows.People.Cast': any
  'Shows.People.CastPast': any
  'Shows.People.Crew': any
  'Shows.People.Director': any
  'Shows.People.DirectorMusical': any
  'Shows.People.DirectorTechnical': any
  'Shows.People.Producer': any
  'Shows.People.Writer': any
  Tags: any
}

export interface ItemPodcast extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  'Author.Email': any
  Author: any
  Category: any
  EpisodeIDs: any
  Explicit: any
  'People.Host': any
  Subtitle: any
  Tags: any
  Type: any
}

export interface ItemSeo extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  Tags: any
}

export interface ItemShow extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  EventIDs: any
  Festival: any
  'People.Cast': any
  'People.CastPast': any
  'People.Crew': any
  'People.Director': any
  'People.DirectorMusical': any
  'People.DirectorTechnical': any
  'People.Producer': any
  'People.Thanks': any
  'People.Writer': any
  'Social.Facebook': any
  'Social.Instagram': any
  'Social.Twitter': any
  Tags: any
}

export interface ItemShow extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  EventIDs: any
  Festival: any
  'People.Cast': any
  'People.CastPast': any
  'People.Crew': any
  'People.Director': any
  'People.DirectorMusical': any
  'People.DirectorTechnical': any
  'People.Producer': any
  'People.Thanks': any
  'People.Writer': any
  'Social.Facebook': any
  'Social.Instagram': any
  'Social.Twitter': any
  Tags: any
}

export interface ItemUser extends ItemBase {
  Email: any
  Food: any
  'Name.First': any
  'Name.Last': any
  'Name.Preferred': any
}

export interface ItemVenue extends ItemBase {
  Headline: any
  Overline: any
  Subline: any
  //
  'Address.City': any
  'Address.GeoLat': any
  'Address.GeoLng': any
  'Address.Neighborhood': any
  'Address.PostalCode': any
  'Address.State': any
  'Address.Street': any
  'Episodes.Venues.RecordAt': any
  EventIDs: any
  Phone: any
  Slug: any
  'Social.Facebook': any
  'Social.Instagram': any
  'Social.Twitter': any
  Tags: any
  Website: any
}

export interface RouteData {
  isIndex: any
  isPage: any
  relativeUrl: any
  routeType: any
  slug: any
  url: any
}

export interface Seo {
  canonical: any
  description: any
  noindex: any
  openGraph: any
  title: any
}

export type CatchAllItem = {
  item:
    | ItemBlog
    | ItemEpisode
    | ItemEvent
    | ItemPerson
    | ItemPodcast
    | ItemSeo
    | ItemShow
    | ItemUser
    | ItemVenue
}

// export interface CatchAll {
//   item: CatchAllItem
//   items: any
//   preview: string | boolean
//   routeData: RouteData
//   seo: Seo
// }

export interface CatchAll {
  item:
    | ItemBlog
    | ItemEpisode
    | ItemEvent
    | ItemPerson
    | ItemPodcast
    | ItemSeo
    | ItemShow
    | ItemUser
    | ItemVenue
  items: any
  preview: string | boolean
  routeData: RouteData
  seo: Seo
}

export type ContentProperties = {
  properties: any[]
}

export type ContentValue = {
  id: string
  type: string
  properties?: ContentProperties[]
}

export type Content = {
  value: ContentValue
}

export type BlogItem = {
  Authors: string
  columns: any
  content: Content[]
  'Date.Published': any
  Date: any
  Headline: string
  id: string
  NextLink: any
  NoIndex: string
  Overline: string
  preview: any
  Published: string
  routeType: string
  'SEO.Description': string
  'SEO.Image.Description': string
  'SEO.Image': string
  Slug: string
  Subline: string
  Tags: string
  Title: string
}

export type Blog = {
  [id: string]: BlogItem
}

export type Image = {
  url: string
}

export type Speaker = {
  name: string
  bio: string
  title: string
  slug: string
  twitter: string
  github: string
  company: string
  talk: Talk
  image: Image
  imageSquare: Image
}

export type Stage = {
  name: string
  slug: string
  stream: string
  discord: string
  schedule: Talk[]
}

export type Talk = {
  title: string
  description: string
  start: string
  end: string
  speaker: Speaker[]
}

export type Link = {
  url: string
}

export type Sponsor = {
  name: string
  description: string
  slug: string
  website: string
  callToAction: string
  callToActionLink: string
  links: SponsorLink[]
  discord: string
  tier: string
  cardImage: Image
  logo: Image
  youtubeSlug: string
}

export type SponsorLink = {
  text: string
  url: string
}

export type Job = {
  id: string
  companyName: string
  title: string
  description: string
  discord: string
  link: string
  rank: number
}

export type ConfUser = {
  id?: string
  email: string
  ticketNumber: number
  name?: string
  username?: string
  createdAt: number
}

export type GitHubOAuthData =
  | {
      type: 'token'
      token: string
    }
  | {
      type: 'user'
      name: string
      login: string
    }
