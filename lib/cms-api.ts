/* eslint-disable @typescript-eslint/require-await */
// import { Blog, Job, Sponsor, Stage, Speaker } from '~lib/types'
import { Blog } from '~lib/types'

import * as notionApi from './notion'

let cmsApi: {
  getBlog: (catchAll) => Promise<Blog>
  getBlogs: () => Promise<Blog[]>
  getEvent: () => Promise<any>
  getEvents: () => Promise<any[]>
  getPage: () => Promise<any>
  getPages: () => Promise<any[]>
  getPeople: () => Promise<any>
  getPeoples: () => Promise<any[]>
  getPodcast: () => Promise<any>
  getPodcasts: () => Promise<any[]>
  getShow: () => Promise<any>
  getShows: () => Promise<any[]>
  getVenue: () => Promise<any>
  getVenues: () => Promise<any[]>

  // getJobs: () => Promise<Job[]>
  // getSpeakers: () => Promise<Speaker[]>
  // getSponsors: () => Promise<Sponsor[]>
  // getStages: () => Promise<Stage[]>
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
    getPages: async () => [],
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

export function getEvents(): Promise<Blog[]> {
  return cmsApi.getEvents()
}

export function getPage(catchAll): Promise<any> {
  return cmsApi.getPage(catchAll)
}

export function getPages(): Promise<Blog[]> {
  return cmsApi.getPages()
}

export function getPeople(catchAll): Promise<any> {
  return cmsApi.getPeople(catchAll)
}

export function getPeoples(): Promise<Blog[]> {
  return cmsApi.getPeoples()
}

export function getPodcast(catchAll): Promise<any> {
  return cmsApi.getPodcast(catchAll)
}

export function getPodcasts(): Promise<Blog[]> {
  return cmsApi.getPodcasts()
}

export function getShow(catchAll): Promise<any> {
  return cmsApi.getShow(catchAll)
}

export function getShows(): Promise<Blog[]> {
  return cmsApi.getShows()
}

export function getVenue(catchAll): Promise<any> {
  return cmsApi.getVenue(catchAll)
}

export function getVenues(): Promise<Blog[]> {
  return cmsApi.getVenues()
}

// export async function getJobs(): Promise<Job[]> {
//   return cmsApi.getJobs()
// }

// export async function getSpeakers(): Promise<Speaker[]> {
//   return cmsApi.getSpeakers()
// }

// export async function getSponsors(): Promise<Sponsor[]> {
//   return cmsApi.getSponsors()
// }

// export async function getStages(): Promise<Stage[]> {
//   return cmsApi.getStages()
// }
