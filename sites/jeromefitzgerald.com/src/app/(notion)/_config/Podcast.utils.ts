import { getPropertyTypeData } from 'next-notion/src/utils'

import type { PropertiesPodcast } from '~app/(notion)/_config'

/**
 * @todo(typescript) way to do this through extraction?
 */
function getPropertyTypeDataPodcast(properties, property: keyof PropertiesPodcast) {
  return getPropertyTypeData(properties, property)
}
function getPodcastData(properties) {
  // if (!properties) return {}

  const data = {
    href: getPropertyTypeDataPodcast(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPodcast(properties, 'ID'),
    title: getPropertyTypeDataPodcast(properties, 'Title'),
    /**
     * Date Information
     */
    dateIso: getPropertyTypeDataPodcast(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataPodcast(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataPodcast(
      properties,
      'Date.DayOfMonthOrdinal'
    ),
    dayOfWeek: getPropertyTypeDataPodcast(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataPodcast(properties, 'Date.DayOfWeekAbbr'),
    month: getPropertyTypeDataPodcast(properties, 'Date.Month'),
    monthName: getPropertyTypeDataPodcast(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataPodcast(properties, 'Date.MonthNameAbbr'),
    time: getPropertyTypeDataPodcast(properties, 'Date.Time'),
    timezone: getPropertyTypeDataPodcast(properties, 'Date.Timezone'),
    year: getPropertyTypeDataPodcast(properties, 'Date.Year'),
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPodcast(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPodcast(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPodcast(properties, 'Is.Published'),
    /**
     * Show Information
     */
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataPodcast(properties, 'SEO.Description'),
    seoKeywords: getPropertyTypeDataPodcast(properties, 'SEO.Keywords'),
    seoImageDescription: getPropertyTypeDataPodcast(
      properties,
      'SEO.Image.Description'
    ),
    seoImage: getPropertyTypeDataPodcast(properties, 'SEO.Image')[0],
  }

  return data
}

export { getPodcastData, getPropertyTypeDataPodcast }
