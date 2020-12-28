/* eslint-disable @typescript-eslint/require-await */
// import { Blog, Job, Sponsor, Stage, Speaker } from '~lib/types'
import { Blog } from '~lib/types'

import * as notionApi from './notion'

let cmsApi: {
  getBlog: (catchAll) => Promise<Blog>
  getBlogs: () => Promise<Blog[]>

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
  }
}

export function getBlog(catchAll): Promise<Blog> {
  return cmsApi.getBlog(catchAll)
}

export function getBlogs(): Promise<Blog[]> {
  return cmsApi.getBlogs()
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
