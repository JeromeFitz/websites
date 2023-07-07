import _merge from 'lodash/merge'
import _size from 'lodash/size'
import _uniq from 'lodash/uniq'

import type { PropertiesEvent } from '~app/(notion)/(config)/segments'
import { getPropertyTypeData } from '~app/(notion)/(config)/utils'

/**
 * @todo(typescript) way to do this through extraction?
 */
function getPropertyTypeDataEvent(properties, property: keyof PropertiesEvent) {
  return getPropertyTypeData(properties, property)
}
function getEventData(properties) {
  // if (!properties) return {}
  /**
   * @todo(notion) little more convulted than I thought here for Override.Slug
   *
   * Considering we need to _query_ Notion we need to know that, heh.
   * So ... just keep as `Slug.Preview` as the check now.
   */
  // const overrideSlug = getPropertyTypeDataEvent(properties, 'Override.Slug')
  // const overideTags = getPropertyTypeDataEvent(properties, 'Override.Tags')
  const overrideTitle = getPropertyTypeDataEvent(properties, 'Override.Title')

  /**
   * @todo(notion) can we get the Rollup value in a better way?
   */
  const tagsPrimary =
    getPropertyTypeDataEvent(properties, 'Rollup.Shows.Primary.Tags') ?? []
  const tagsSecondary =
    getPropertyTypeDataEvent(properties, 'Rollup.Shows.Supporting.Tags') ?? []

  const tags = _uniq(_merge(tagsPrimary, tagsSecondary))

  let venueTitle = getPropertyTypeDataEvent(properties, 'Rollup.Venues.Title') ?? ''
  if (!!venueTitle) {
    venueTitle = venueTitle[0]
  }

  let title = getPropertyTypeDataEvent(properties, 'Title')
  let titleFromPrimary =
    getPropertyTypeDataEvent(properties, 'Rollup.Shows.Primary.Title') ?? ''
  if (!!titleFromPrimary) {
    titleFromPrimary = titleFromPrimary[0]
  }

  const hasTitleFromPrimary = _size(titleFromPrimary) > 0
  title = overrideTitle ? title : hasTitleFromPrimary ? titleFromPrimary : title

  const daysUntilEvent = getPropertyTypeDataEvent(properties, 'Date.DaysUntilEvent')
  const hoursUntilEvent = getPropertyTypeDataEvent(
    properties,
    'Date.HoursUntilEvent'
  )
  const isEventOver = hoursUntilEvent < 0

  const data = {
    href: getPropertyTypeDataEvent(properties, 'Slug.Preview'),
    id: getPropertyTypeDataEvent(properties, 'ID'),
    title,
    /**
     * Date Information
     */
    dateIso: getPropertyTypeDataEvent(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataEvent(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataEvent(
      properties,
      'Date.DayOfMonthOrdinal'
    ),
    dayOfWeek: getPropertyTypeDataEvent(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataEvent(properties, 'Date.DayOfWeekAbbr'),
    month: getPropertyTypeDataEvent(properties, 'Date.Month'),
    monthName: getPropertyTypeDataEvent(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataEvent(properties, 'Date.MonthNameAbbr'),
    time: getPropertyTypeDataEvent(properties, 'Date.Time'),
    timezone: getPropertyTypeDataEvent(properties, 'Date.Timezone'),
    year: getPropertyTypeDataEvent(properties, 'Date.Year'),
    //
    daysUntilEvent,
    hoursUntilEvent,
    isEventOver,
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataEvent(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataEvent(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataEvent(properties, 'Is.Published'),
    /**
     * Show Information
     */
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataEvent(properties, 'SEO.Description'),
    seoKeywords: getPropertyTypeDataEvent(properties, 'SEO.Keywords'),
    seoImageDescription: getPropertyTypeDataEvent(
      properties,
      'SEO.Image.Description'
    ),
    seoImage: getPropertyTypeDataEvent(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags,
    /**
     * Ticket Information
     */
    ticketUrl: getPropertyTypeDataEvent(properties, 'URL.Ticket'),
    /**
     * Venue Information
     */
    venueTitle,
    venues: getPropertyTypeDataEvent(properties, 'Relation.Venues'),
  }

  return data
}

export { getEventData, getPropertyTypeDataEvent }
