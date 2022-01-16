/* eslint-disable @typescript-eslint/require-await */
import type {
  Blog,
  BlogPost,
  Episode,
  Episodes,
  Event,
  Events,
  Page,
  People,
  Person,
  Podcast,
  Podcasts,
  Show,
  Shows,
  Venue,
  Venues,
} from '@jeromefitz/notion/schema'

// import * as notionApi from './notion'
const notionApi = false

let cmsApi: {
  // getPages: () => Promise<any[]>
  getBlog: () => Promise<Blog>
  getBlogPost: (catchAll) => Promise<BlogPost>
  getEpisode: (catchAll) => Promise<Episode>
  getEpisodes: () => Promise<Episodes>
  getEvent: (catchAll) => Promise<Event>
  getEvents: () => Promise<Events>
  getPage: (catchAll) => Promise<Page>
  getPeople: () => Promise<People>
  getPerson: (catchAll) => Promise<Person>
  getPodcast: (catchAll) => Promise<Podcast>
  getPodcasts: () => Promise<Podcasts>
  getShow: (catchAll) => Promise<Show>
  getShows: () => Promise<Shows>
  getVenue: (catchAll) => Promise<Venue>
  getVenues: () => Promise<Venues>
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

export function getBlog(): Promise<Blog> {
  return cmsApi.getBlog()
}

export function getBlogPost(catchAll): Promise<BlogPost> {
  return cmsApi.getBlogPost(catchAll)
}

export function getEpisode(catchAll): Promise<Episode> {
  return cmsApi.getEpisode(catchAll)
}

export function getEpisodes(): Promise<Episodes> {
  return cmsApi.getEpisodes()
}

export function getEvent(catchAll): Promise<Event> {
  return cmsApi.getEvent(catchAll)
}

export function getEvents(): Promise<Events> {
  return cmsApi.getEvents()
}

export function getPage(catchAll): Promise<Page> {
  return cmsApi.getPage(catchAll)
}

// export function getPages(): Promise<any[]> {
//   return cmsApi.getPages()
// }

export function getPeople(): Promise<People> {
  return cmsApi.getPeople()
}

export function getPerson(catchAll): Promise<Person> {
  return cmsApi.getPerson(catchAll)
}

export function getPodcast(catchAll): Promise<Podcast> {
  return cmsApi.getPodcast(catchAll)
}

export function getPodcasts(): Promise<Podcasts> {
  return cmsApi.getPodcasts()
}

export function getShow(catchAll): Promise<Show> {
  return cmsApi.getShow(catchAll)
}

export function getShows(): Promise<Shows> {
  return cmsApi.getShows()
}

export function getVenue(catchAll): Promise<Venue> {
  return cmsApi.getVenue(catchAll)
}

export function getVenues(): Promise<Venues> {
  return cmsApi.getVenues()
}
