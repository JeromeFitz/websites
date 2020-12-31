/* eslint-disable @typescript-eslint/require-await */
import { Blog } from '~lib/types'

import * as notionApi from './notion'

let cmsApi: {
  getBlog: (catchAll) => Promise<Blog>
  getBlogs: () => Promise<Blog[]>
  getEvent: (catchAll) => Promise<any>
  getEvents: () => Promise<any[]>
  getPage: (catchAll) => Promise<any>
  // getPages: () => Promise<any[]>
  getPeople: (catchAll) => Promise<any>
  getPeoples: () => Promise<any[]>
  getPodcast: (catchAll) => Promise<any>
  getPodcasts: () => Promise<any[]>
  getShow: (catchAll) => Promise<any>
  getShows: () => Promise<any[]>
  getVenue: (catchAll) => Promise<any>
  getVenues: () => Promise<any[]>
}

if (notionApi) {
  cmsApi = notionApi
} else {
  cmsApi = {
    getBlog: async () => null,
    getBlogs: async () => [],
    getEvent: async () => null,
    getEvents: async () => [],
    getPage: async () => null,
    // getPages: async () => [],
    getPeople: async () => null,
    getPeoples: async () => [],
    getPodcast: async () => null,
    getPodcasts: async () => [],
    getShow: async () => null,
    getShows: async () => [],
    getVenue: async () => null,
    getVenues: async () => [],
  }
}

export function getBlog(catchAll): Promise<Blog> {
  return cmsApi.getBlog(catchAll)
}

export function getBlogs(): Promise<Blog[]> {
  return cmsApi.getBlogs()
}

export function getEvent(catchAll): Promise<any> {
  return cmsApi.getEvent(catchAll)
}

export function getEvents(): Promise<any[]> {
  return cmsApi.getEvents()
}

export function getPage(catchAll): Promise<any> {
  return cmsApi.getPage(catchAll)
}

// export function getPages(): Promise<any[]> {
//   return cmsApi.getPages()
// }

export function getPeople(catchAll): Promise<any> {
  return cmsApi.getPeople(catchAll)
}

export function getPeoples(): Promise<any[]> {
  return cmsApi.getPeoples()
}

export function getPodcast(catchAll): Promise<any> {
  return cmsApi.getPodcast(catchAll)
}

export function getPodcasts(): Promise<any[]> {
  return cmsApi.getPodcasts()
}

export function getShow(catchAll): Promise<any> {
  return cmsApi.getShow(catchAll)
}

export function getShows(): Promise<any[]> {
  return cmsApi.getShows()
}

export function getVenue(catchAll): Promise<any> {
  return cmsApi.getVenue(catchAll)
}

export function getVenues(): Promise<any[]> {
  return cmsApi.getVenues()
}
