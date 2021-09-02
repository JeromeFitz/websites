import { notion, SEO, TYPES } from '~utils/notion/helper'

const getPageData = async (pageId, routeType) => {
  console.dir(`pageId: ${pageId}`)
  console.dir(`routeType: ${routeType}`)
  console.dir(`SEO[routeType]: ${SEO[routeType]}`)
  console.dir(!!pageId ? pageId : SEO[routeType])
  // return await notion.blocks.children.list({
  //   block_id: !!pageId ? pageId : SEO[routeType],
  // })
  return !!pageId
    ? await notion.blocks.children.list({
        block_id: pageId,
      })
    : await notion.pages.retrieve({
        page_id: SEO[routeType],
      })
}

const getPage = async (pathVariables, pageId) => {
  let data

  switch (pathVariables.routeType) {
    case TYPES.blog:
    case TYPES.events:
    case TYPES.shows:
      data = await getPageData(pageId, pathVariables.routeType)
      break
    default:
      break
  }
  return data
}

export default getPage
