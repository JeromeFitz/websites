import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PropertiesEpisode } from '@/app/(notion)/_config/index'

/**
 * @todo(typescript) way to do this through extraction?
 */
function getPropertyTypeDataEpisode(properties, property: keyof PropertiesEpisode) {
  return getPropertyTypeData(properties, property)
}
function getEpisodeData(properties) {
  // if (!properties) return {}

  let venueTitle =
    getPropertyTypeDataEpisode(properties, 'Rollup.Venues.Title') ?? ''
  if (venueTitle) {
    venueTitle = venueTitle[0]
  }

  const data = {
    dateIso: getPropertyTypeDataEpisode(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataEpisode(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataEpisode(
      properties,
      'Date.DayOfMonthOrdinal',
    ),
    dayOfWeek: getPropertyTypeDataEpisode(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataEpisode(properties, 'Date.DayOfWeekAbbr'),
    duration: getPropertyTypeDataEpisode(properties, 'Meta.Time'),
    durationInSeconds: getPropertyTypeDataEpisode(properties, 'Meta.Time.Duration'),
    episode: getPropertyTypeDataEpisode(properties, 'Meta.Episode'),
    hosts: getPropertyTypeDataEpisode(properties, 'Rollup.People.Host.Title'),
    hour: getPropertyTypeDataEpisode(properties, 'Meta.Time.Hours'),
    href: getPropertyTypeDataEpisode(properties, 'Slug.Preview'),
    id: getPropertyTypeDataEpisode(properties, 'ID'),
    isActive: getPropertyTypeDataEpisode(properties, 'Is.Active'),
    isExplicit: getPropertyTypeDataEpisode(properties, 'Is.Explicit'),
    isIndexed: getPropertyTypeDataEpisode(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataEpisode(properties, 'Is.Published'),
    minute: getPropertyTypeDataEpisode(properties, 'Meta.Time.Minutes'),
    month: getPropertyTypeDataEpisode(properties, 'Date.Month'),
    monthName: getPropertyTypeDataEpisode(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataEpisode(properties, 'Date.MonthNameAbbr'),
    mp3: getPropertyTypeDataEpisode(properties, 'Meta.MP3'),
    podcastAppleId: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Apple.ID',
    ),
    podcastAppleUrl: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Apple.URL',
    ),
    podcastSlug: getPropertyTypeDataEpisode(properties, 'Rollup.Podcasts.Slug'),
    podcastSpotifyId: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Spotify.ID',
    ),
    podcastSpotifyUrl: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Spotify.URL',
    ),
    podcastTitle: getPropertyTypeDataEpisode(properties, 'Rollup.Podcasts.Title')[0],
    season: getPropertyTypeDataEpisode(properties, 'Meta.Season'),
    second: getPropertyTypeDataEpisode(properties, 'Meta.Time.Seconds'),
    seoDescription: getPropertyTypeDataEpisode(properties, 'SEO.Description'),
    seoImage: getPropertyTypeDataEpisode(properties, 'SEO.Image')[0],
    seoImageDescription: getPropertyTypeDataEpisode(
      properties,
      'SEO.Image.Description',
    ),
    seoKeywords: getPropertyTypeDataEpisode(properties, 'SEO.Keywords'),
    spotifyId: getPropertyTypeDataEpisode(properties, 'Meta.Spotify.ID'),

    subtitle: getPropertyTypeDataEpisode(properties, 'Subtitle'),
    time: getPropertyTypeDataEpisode(properties, 'Date.Time'),
    timezone: getPropertyTypeDataEpisode(properties, 'Date.Timezone'),
    title: getPropertyTypeDataEpisode(properties, 'Title'),
    type: getPropertyTypeDataEpisode(properties, 'Meta.Type'),
    venues: getPropertyTypeDataEpisode(properties, 'Relation.Venues'),
    venueTitle,
    year: getPropertyTypeDataEpisode(properties, 'Date.Year'),
  }

  return data
}

export { getEpisodeData, getPropertyTypeDataEpisode }
