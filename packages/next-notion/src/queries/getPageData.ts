import 'server-only'

// import { cache } from 'react'
// import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints.js'
// import type { PageObjectResponseShow } from '../../shows/[[...catchAll]]/Show.types'
import { notion } from '../helper'

type PageData = any

async function getPageData(page_id) {
  // const getPageData = cache(async (page_id) => {
  // console.dir(`(2) page_id:  ${page_id}`)
  // // if ((_startsWith(page_id), '/events') || page_id === undefined) return null
  // console.dir(`(3) page_id:  ${page_id}`)
  // // return {}
  const response: PageData = await notion.pages.retrieve({
    page_id,
  })
  // console.dir(`(4) response: ${response?.id}`)
  // console.dir(response)
  return response
}
// )

export { getPageData }
