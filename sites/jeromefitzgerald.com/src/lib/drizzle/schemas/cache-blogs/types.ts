import type { Cache } from '../helpers.types'

export interface BlogNotionProperties {
  Authors: any
  Date: any
  'Date.DayOfMonth': any
  'Date.DayOfMonthOrdinal': any
  'Date.DayOfWeek': any
  'Date.DayOfWeekOrdinal': any
  'Date.ISO': any
  'Date.Month': any
  'Date.MonthName': any
  'Date.MonthNameAbbr': any
  'Date.Published': any
  'Date.Time': any
  'Date.Timezone': any
  'Date.WeekNumber': any
  'Date.Year': any
  ID: any
  'Is.Indexed': any
  'Is.Published': any
  'SEO.Description': any
  'SEO.Image': any
  'SEO.Image.Description': any
  'SEO.Keywords': any
  Slug: any
  'Slug.Preview': any
  Title: any
}

export type BlogJson = {
  authors: any
  date: any
  dateDayOfMonth: any
  dateDayOfMonthOrdinal: any
  dateDayOfWeek: any
  dateDayOfWeekOrdinal: any
  dateISO: any
  dateMonthName: any
  dateMonthNameAbbr: any
  datePublished: any
  dateTime: any
  dateTimeZone: any
  dateWeekNumber: any
  dateYear: any
  id: any
  isIndexed: boolean
  isPublished: boolean
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
  slug: any
  slugPreview: any
  title: any
}

export type Blog = BlogJson & Cache
