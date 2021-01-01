import _find from 'lodash/find'
import _join from 'lodash/join'
import _last from 'lodash/last'

import getCollectionView from '~config/notion/schema/getCollectionView'
import { isPages } from '~config/notion/website'

import generateQueryCollection from '~lib/notion/utils/generateQueryCollection'
import getBlocks from '~lib/notion/utils/getBlocks'
import getProperties from '~lib/notion/utils/getProperties'
import getRouteTypeSeo from '~lib/notion/utils/getRouteTypeSeo'

import { Blog } from '../types'

const isDebug = false
const debugRouteType = 'shows'

const notionConfig = {
  apiUrl: process.env.NOTION_API_URL,
  loader: {
    type: 'table',
    searchQuery: '',
    userTimeZone: 'America/New_York',
    userLocale: 'en',
    loadContentCover: false,
    limit: 70,
  },
  shard: process.env.NOTION_SHARD,
  token: process.env.NOTION_TOKEN,
  useCache: process.env.NEXT_PUBLIC__NOTION_USE_CACHE,
  userId: process.env.NOTION_USER_ID,
  users: process.env.NOTION_USERS,
}

const notionHeaders = {
  'content-type': 'application/json',
  cookie: `token_v2=${notionConfig.token}`,
  'x-notion-active-user-header': notionConfig.userId,
}

export async function fetchCmsAPI(fnName: string, body: any) {
  // isDebug && console.dir(`body`)
  // isDebug && console.dir(body)

  if (fnName === undefined) {
    throw new Error(`fetchCmsAPI: fnName must be provided`)
  }

  if (body === undefined) {
    throw new Error(`fetchCmsAPI: body must be provided`)
  }
  const url = `${notionConfig.apiUrl}/${fnName}`
  const res = await fetch(url, {
    method: 'POST',
    headers: notionHeaders,
    body: JSON.stringify(body),
  })

  const json = await res.json()
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  // return json.data
  return json
}

const refactorNotionCalls = async (catchAll) => {
  // @refactor(DRY)
  const isPage = isPages(catchAll[0])
  const routeType = isPage ? 'pages' : catchAll[0]
  const isIndex = !catchAll[1]
  // @todo(notion) getSlug: nuance between Blog|Events and others
  const slug = (!isIndex || isPage) && _last(catchAll)

  const todoDebug = isDebug && routeType === debugRouteType

  todoDebug && console.dir(`> refactorNotionCalls`)
  todoDebug && console.dir(`isPage:    ${isPage}`)
  todoDebug && console.dir(`isIndex:   ${isIndex}`)
  todoDebug && console.dir(`routeType: ${routeType}`)
  todoDebug && console.dir(catchAll)

  const notionQuery = getCollectionView({ catchAll })
  todoDebug && console.dir(`notionQuery`)
  todoDebug && console.dir(notionQuery)
  // generateQueryCollection
  const getQueryCollection = generateQueryCollection(notionQuery)
  // todoDebug && console.dir(`getQueryCollection`)
  // todoDebug && console.dir(getQueryCollection)
  // fetchCmsAPI (rpc)
  const data = !!getQueryCollection
    ? await fetchCmsAPI('queryCollection', getQueryCollection.payload)
    : null

  // // todoDebug && console.dir(`data`)
  // // todoDebug && console.dir(data)
  // // todoDebug  && console.dir(`data.recordMap.block`)
  // // todoDebug  && console.dir(data.recordMap.block)

  const blocks = getBlocks(data.recordMap.block)
  // todoDebug && console.dir(`blocks`)
  // todoDebug && console.dir(blocks)

  const properties: any = await getProperties({
    blocks,
    routeType,
    schema: getQueryCollection.schema,
  })

  // todoDebug && console.dir(`properties`)
  // todoDebug && console.dir(properties)

  // return properties

  /**
   * SEO & Other Data
   */
  const relativeUrl = _join(catchAll, '/')
  const urlBase = 'https://jeromefitzgerald.com/'
  let noindex = false
  let title: string, description: string, openGraph: any
  let url: string = urlBase

  //
  url += relativeUrl
  noindex = false

  const isItems = isIndex && !slug
  const items = isItems ? properties : null
  const item = !isItems ? _find(properties, { Slug: slug }) : null

  let routeTypeSeo: any = null
  if (items) {
    // @todo(notion) Blog, Event ... Date Listing SEO Defaults
    routeTypeSeo = await getRouteTypeSeo(routeType)
    title = routeTypeSeo['Title']
    description = routeTypeSeo['SEO.Description']
    noindex = routeTypeSeo.NoIndex || false
    openGraph = routeTypeSeo && {
      url,
      title,
      description,
      images:
        routeTypeSeo && routeTypeSeo['SEO.Image']
          ? [
              {
                alt: routeTypeSeo['SEO.Image.Description'] || description,
                url: routeTypeSeo['SEO.Image'],
              },
            ]
          : null,
    }
  } else {
    title = item['Title']
    description = item['SEO.Description']
    noindex = item.NoIndex || false
    openGraph = item && {
      url,
      title,
      description,
      images:
        item && item['SEO.Image']
          ? [
              {
                alt: item['SEO.Image.Description'] || description,
                url: item['SEO.Image'],
              },
            ]
          : null,
    }
  }

  const seo = {
    canonical: url,
    description,
    noindex,
    openGraph,
    title,
  }

  return {
    item,
    items,
    seo,
    routeData: {
      relativeUrl,
      routeType,
      catchAll,
      slug,
    },
  }
}

export async function getBlog(catchAll): Promise<Blog> {
  return await refactorNotionCalls(catchAll)
}

export async function getBlogs(): Promise<Blog[]> {
  const catchAll = ['blog']
  return await refactorNotionCalls(catchAll)
}

export async function getEvent(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

export async function getEvents(): Promise<any[]> {
  const catchAll = ['events']
  return await refactorNotionCalls(catchAll)
}

export async function getPage(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

// // @note This one is different than the others :X
// export async function getPages(): Promise<any[]> {
//   console.dir(`___ notion:index::pages`)
//   const catchAll = ['']
//   return await refactorNotionCalls(catchAll)
// }

export async function getPeople(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

export async function getPeoples(): Promise<any[]> {
  const catchAll = ['people']
  return await refactorNotionCalls(catchAll)
}

export async function getPodcast(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

export async function getPodcasts(): Promise<any[]> {
  const catchAll = ['podcasts']
  return await refactorNotionCalls(catchAll)
}

export async function getShow(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

export async function getShows(): Promise<any[]> {
  const catchAll = ['shows']
  console.dir(`> getShows`)
  return await refactorNotionCalls(catchAll)
}

export async function getVenue(catchAll): Promise<any> {
  return await refactorNotionCalls(catchAll)
}

export async function getVenues(): Promise<any[]> {
  const catchAll = ['venues']
  return await refactorNotionCalls(catchAll)
}

// blogs = blogs.sort((a: any, b: any) => (a.fields.rank > b.fields.rank ? 1 : -1))

// await expandContentList({ agility, contentItems: blogs, languageCode, depth: 1 })

// return blogs
//   .map((blog: any) => {
//     return {
//       id: blog.contentID,
//       companyName: blog.fields.company?.fields.name,
//       title: blog.fields.name,
//       description: blog.fields.description,
//       discord: blog.fields.discord,
//       link: blog.fields.link,
//       rank: parseInt(blog.fields.rank),
//     }
//   })
//   .sort((a: any, b: any) => (a.rank > b.rank ? 1 : -1))

// export const asyncForEach = async (array: any, callback: any) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array)
//   }
// }
