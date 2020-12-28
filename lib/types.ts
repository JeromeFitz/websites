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
