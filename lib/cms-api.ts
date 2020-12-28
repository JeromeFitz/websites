import { Blog, Job, Sponsor, Stage, Speaker } from '~lib/types'

let cmsApi: {
  getBlogs: () => Promise<Blog[]>
  getJobs: () => Promise<Job[]>
  getSpeakers: () => Promise<Speaker[]>
  getSponsors: () => Promise<Sponsor[]>
  getStages: () => Promise<Stage[]>
}

export function getBlogs(): Promise<Blog[]> {
  // return cmsApi.getBlogs()
  return null
}

export async function getJobs(): Promise<Job[]> {
  return cmsApi.getJobs()
}

export async function getSpeakers(): Promise<Speaker[]> {
  return cmsApi.getSpeakers()
}

export async function getSponsors(): Promise<Sponsor[]> {
  return cmsApi.getSponsors()
}

export async function getStages(): Promise<Stage[]> {
  return cmsApi.getStages()
}
