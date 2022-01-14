/* eslint-disable @typescript-eslint/require-await */
import type { TYPES } from '@jeromefitz/notion'

// import * as notionApi from './notion'
const notionApi = false

let cmsApi: {
  // getPages: () => Promise<any[]>
  getBlog: () => Promise<TYPES.Blog>
  getBlogPost: (catchAll) => Promise<TYPES.BlogPost>
  getEpisode: (catchAll) => Promise<TYPES.Episode>
  getEpisodes: () => Promise<TYPES.Episodes>
  getEvent: (catchAll) => Promise<TYPES.Event>
  getEvents: () => Promise<TYPES.Events>
  getPage: (catchAll) => Promise<TYPES.Page>
  getPeople: () => Promise<TYPES.People>
  getPerson: (catchAll) => Promise<TYPES.Person>
  getPodcast: (catchAll) => Promise<TYPES.Podcast>
  getPodcasts: () => Promise<TYPES.Podcasts>
  getShow: (catchAll) => Promise<TYPES.Show>
  getShows: () => Promise<TYPES.Shows>
  getVenue: (catchAll) => Promise<TYPES.Venue>
  getVenues: () => Promise<TYPES.Venues>
}

if (notionApi) {
  cmsApi = notionApi
} else {
  cmsApi = {
    // getPages: async () => null,
    getBlog: async () => null,
    getBlogPost: async () => null,
    getEpisode: async () => null,
    getEpisodes: async () => null,
    getEvent: async () => null,
    getEvents: async () => null,
    getPage: async () => null,
    getPeople: async () => null,
    getPerson: async () => null,
    getPodcast: async () => null,
    getPodcasts: async () => null,
    getShow: async () => null,
    getShows: async () => null,
    getVenue: async () => null,
    getVenues: async () => null,
  }
}

export function getBlog(): Promise<TYPES.Blog> {
  return cmsApi.getBlog()
}

export function getBlogPost(catchAll): Promise<TYPES.BlogPost> {
  return cmsApi.getBlogPost(catchAll)
}

export function getEpisode(catchAll): Promise<TYPES.Episode> {
  return cmsApi.getEpisode(catchAll)
}

export function getEpisodes(): Promise<TYPES.Episodes> {
  return cmsApi.getEpisodes()
}

export function getEvent(catchAll): Promise<TYPES.Event> {
  return cmsApi.getEvent(catchAll)
}

export function getEvents(): Promise<TYPES.Events> {
  return cmsApi.getEvents()
}

export function getPage(catchAll): Promise<TYPES.Page> {
  return cmsApi.getPage(catchAll)
}

// export function getPages(): Promise<any[]> {
//   return cmsApi.getPages()
// }

export function getPeople(): Promise<TYPES.People> {
  return cmsApi.getPeople()
}

export function getPerson(catchAll): Promise<TYPES.Person> {
  return cmsApi.getPerson(catchAll)
}

export function getPodcast(catchAll): Promise<TYPES.Podcast> {
  return cmsApi.getPodcast(catchAll)
}

export function getPodcasts(): Promise<TYPES.Podcasts> {
  return cmsApi.getPodcasts()
}

export function getShow(catchAll): Promise<TYPES.Show> {
  return cmsApi.getShow(catchAll)
}

export function getShows(): Promise<TYPES.Shows> {
  return cmsApi.getShows()
}

export function getVenue(catchAll): Promise<TYPES.Venue> {
  return cmsApi.getVenue(catchAll)
}

export function getVenues(): Promise<TYPES.Venues> {
  return cmsApi.getVenues()
}
