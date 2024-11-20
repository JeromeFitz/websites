import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PropertiesPodcast } from '@/app/(notion)/_config/index'

function getPodcastData(properties) {
  // if (!properties) return {}

  const data = {
    author: getPropertyTypeDataPodcast(properties, 'Author'),
    authorEmail: getPropertyTypeDataPodcast(properties, 'Author.Email'),
    categories: getPropertyTypeDataPodcast(properties, 'Categories'),
    dateIso: getPropertyTypeDataPodcast(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataPodcast(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataPodcast(
      properties,
      'Date.DayOfMonthOrdinal',
    ),
    dayOfWeek: getPropertyTypeDataPodcast(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataPodcast(properties, 'Date.DayOfWeekAbbr'),
    episodeSlugs: getPropertyTypeDataPodcast(properties, 'Rollup.Episodes.Slug'),
    episodeTitles: getPropertyTypeDataPodcast(properties, 'Rollup.Episodes.Title'),
    href: getPropertyTypeDataPodcast(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPodcast(properties, 'ID'),
    isActive: getPropertyTypeDataPodcast(properties, 'Is.Active'),
    isExplicit: getPropertyTypeDataPodcast(properties, 'Is.Explicit'),
    isIndexed: getPropertyTypeDataPodcast(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPodcast(properties, 'Is.Published'),
    month: getPropertyTypeDataPodcast(properties, 'Date.Month'),
    monthName: getPropertyTypeDataPodcast(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataPodcast(properties, 'Date.MonthNameAbbr'),
    seoDescription: getPropertyTypeDataPodcast(properties, 'SEO.Description'),
    seoImage: getPropertyTypeDataPodcast(properties, 'SEO.Image')[0],
    seoImageDescription: getPropertyTypeDataPodcast(
      properties,
      'SEO.Image.Description',
    ),
    seoKeywords: getPropertyTypeDataPodcast(properties, 'SEO.Keywords'),
    subtitle: getPropertyTypeDataPodcast(properties, 'Subtitle'),
    tags: getPropertyTypeDataPodcast(properties, 'Tags'),
    time: getPropertyTypeDataPodcast(properties, 'Date.Time'),
    timezone: getPropertyTypeDataPodcast(properties, 'Date.Timezone'),
    title: getPropertyTypeDataPodcast(properties, 'Title'),
    type: getPropertyTypeDataPodcast(properties, 'Type'),
    year: getPropertyTypeDataPodcast(properties, 'Date.Year'),
  }

  return data
}
/**
 * @todo(typescript) way to do this through extraction?
 */
function getPropertyTypeDataPodcast(properties, property: keyof PropertiesPodcast) {
  return getPropertyTypeData(properties, property)
}

export { getPodcastData, getPropertyTypeDataPodcast }
