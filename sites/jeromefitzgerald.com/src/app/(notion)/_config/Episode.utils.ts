import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesEpisode } from '~app/(notion)/_config'

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
  if (!!venueTitle) {
    venueTitle = venueTitle[0]
  }

  const data = {
    href: getPropertyTypeDataEpisode(properties, 'Slug.Preview'),
    id: getPropertyTypeDataEpisode(properties, 'ID'),
    title: getPropertyTypeDataEpisode(properties, 'Title'),
    /**
     * Date Information
     */
    dateIso: getPropertyTypeDataEpisode(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataEpisode(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataEpisode(
      properties,
      'Date.DayOfMonthOrdinal',
    ),
    dayOfWeek: getPropertyTypeDataEpisode(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataEpisode(properties, 'Date.DayOfWeekAbbr'),
    month: getPropertyTypeDataEpisode(properties, 'Date.Month'),
    monthName: getPropertyTypeDataEpisode(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataEpisode(properties, 'Date.MonthNameAbbr'),
    time: getPropertyTypeDataEpisode(properties, 'Date.Time'),
    timezone: getPropertyTypeDataEpisode(properties, 'Date.Timezone'),
    year: getPropertyTypeDataEpisode(properties, 'Date.Year'),
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataEpisode(properties, 'Is.Active'),
    isExplicit: getPropertyTypeDataEpisode(properties, 'Is.Explicit'),
    isIndexed: getPropertyTypeDataEpisode(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataEpisode(properties, 'Is.Published'),
    /**
     * Meta Information
     */
    durationInSeconds: getPropertyTypeDataEpisode(properties, 'Meta.Time.Duration'),
    duration: getPropertyTypeDataEpisode(properties, 'Meta.Time'),
    hour: getPropertyTypeDataEpisode(properties, 'Meta.Time.Hours'),
    minute: getPropertyTypeDataEpisode(properties, 'Meta.Time.Minutes'),
    second: getPropertyTypeDataEpisode(properties, 'Meta.Time.Seconds'),
    episode: getPropertyTypeDataEpisode(properties, 'Meta.Episode'),
    season: getPropertyTypeDataEpisode(properties, 'Meta.Season'),
    spotifyId: getPropertyTypeDataEpisode(properties, 'Meta.Spotify.ID'),
    type: getPropertyTypeDataEpisode(properties, 'Meta.Type'),
    mp3: getPropertyTypeDataEpisode(properties, 'Meta.MP3'),
    subtitle: getPropertyTypeDataEpisode(properties, 'Subtitle'),
    podcastAppleId: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Apple.ID',
    ),
    podcastAppleUrl: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Apple.URL',
    ),
    podcastSpotifyId: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Spotify.ID',
    ),
    podcastSpotifyUrl: getPropertyTypeDataEpisode(
      properties,
      'Rollup.Podcasts.Spotify.URL',
    ),
    podcastSlug: getPropertyTypeDataEpisode(properties, 'Rollup.Podcasts.Slug'),

    /**
     * Podcast Information
     */
    hosts: getPropertyTypeDataEpisode(properties, 'Rollup.People.Host.Title'),
    podcastTitle: getPropertyTypeDataEpisode(properties, 'Rollup.Podcasts.Title')[0],
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataEpisode(properties, 'SEO.Description'),
    seoKeywords: getPropertyTypeDataEpisode(properties, 'SEO.Keywords'),
    seoImageDescription: getPropertyTypeDataEpisode(
      properties,
      'SEO.Image.Description',
    ),
    seoImage: getPropertyTypeDataEpisode(properties, 'SEO.Image')[0],
    /**
     * Venue Information
     */
    venueTitle,
    venues: getPropertyTypeDataEpisode(properties, 'Relation.Venues'),
  }

  return data
}

export { getEpisodeData, getPropertyTypeDataEpisode }
