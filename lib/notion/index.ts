import getCollectionView from '~config/notion/schema/getCollectionView'
import { isPages } from '~config/notion/website'

import generateQueryCollection from '~lib/notion/utils/generateQueryCollection'
import getBlocks from '~lib/notion/utils/getBlocks'
import getProperties from '~lib/notion/utils/getProperties'

import { Blog } from '../types'

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
  const url = `${notionConfig.apiUrl}/${fnName}`
  const res = await fetch(url, {
    method: 'POST',
    headers: notionHeaders,
    body: JSON.stringify(body),
  })

  console.dir(`body`)
  console.dir(body.query)

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
  // const isIndex = !catchAll[1]
  // const slug = !isIndex && catchAll[1]

  // getCollectionView
  const notionQuery = getCollectionView({ catchAll })
  console.dir(`notionQuery`)
  console.dir(notionQuery)
  // generateQueryCollection
  const getQueryCollection = generateQueryCollection(notionQuery)
  // console.dir(`getQueryCollection`)
  // console.dir(getQueryCollection)
  // fetchCmsAPI (rpc)
  const data = !!getQueryCollection
    ? await fetchCmsAPI('queryCollection', getQueryCollection.payload)
    : null

  // console.dir(`data`)
  // console.dir(data)
  // console.dir(`data.recordMap.block`)
  // console.dir(data.recordMap.block)

  const blocks = getBlocks(data.recordMap.block)
  console.dir(`blocks`)
  console.dir(blocks)

  const properties: any = await getProperties({
    blocks,
    routeType,
    schema: getQueryCollection.schema,
  })

  console.dir(`properties`)
  console.dir(properties)

  return properties
}

export async function getBlog(catchAll): Promise<Blog> {
  return await refactorNotionCalls(catchAll)
}

export async function getBlogs(): Promise<Blog[]> {
  const catchAll = ['blog']
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
