export { CONFIG } from "./config";

export type { PageObjectResponseEpisode, PropertiesEpisode } from "./episode.types";
export { getEpisodeData, getPropertyTypeDataEpisode } from "./episode.utils";

export type { PageObjectResponsePage, PropertiesPage } from "./page.types";
export { getPageData, getPropertyTypeDataPage } from "./page.utils";

export type { PageObjectResponsePerson, PropertiesPerson } from "./person.types";
export { getPersonData, getPropertyTypeDataPerson } from "./person.utils";

export type { PageObjectResponsePodcast, PropertiesPodcast } from "./podcast.types";
export { getPodcastData, getPropertyTypeDataPodcast } from "./podcast.utils";

export type { PageObjectResponseVenue, PropertiesVenue } from "./venue.types";
export { getPropertyTypeDataVenue } from "./venue.utils";

// @todo(types) way to do this for data passback and tell which one?
// type PageObjectResponseCustom =
//   | PageObjectResponseEvent
//   | PageObjectResponsePage
//   | PageObjectResponsePerson
//   | PageObjectResponseShow
//   | PageObjectResponseVenue
// export type { PageObjectResponseCustom }
