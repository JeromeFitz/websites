export { CONFIG } from './config'

export type { PageObjectResponseEvent, PropertiesEvent } from './Event.types'
export { getEventData, getPropertyTypeDataEvent } from './Event.utils'

export type { PageObjectResponsePage, PropertiesPage } from './Page.types'
export { getPageData, getPropertyTypeDataPage } from './Page.utils'

export type { PageObjectResponsePerson, PropertiesPerson } from './Person.types'
export { getPersonData, getPropertyTypeDataPerson } from './Person.utils'

export type { PageObjectResponsePodcast, PropertiesPodcast } from './Podcast.types'
export { getPodcastData, getPropertyTypeDataPodcast } from './Podcast.utils'

export type { PageObjectResponseShow, PropertiesShow } from './Show.types'
export { getShowData, getPropertyTypeDataShow } from './Show.utils'

export type { PageObjectResponseVenue, PropertiesVenue } from './Venue.types'
export { getPropertyTypeDataVenue } from './Venue.utils'

// @todo(types) way to do this for data passback and tell which one?
// type PageObjectResponseCustom =
//   | PageObjectResponseEvent
//   | PageObjectResponsePage
//   | PageObjectResponsePerson
//   | PageObjectResponseShow
//   | PageObjectResponseVenue
// export type { PageObjectResponseCustom }
