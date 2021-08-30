import { notion, TYPES } from '~utils/notion/helper'

const getPage = async (pathVariables, pageId) => {
  let data

  switch (pathVariables.routeType) {
    // case TYPES.blog:
    case TYPES.events:
    case TYPES.shows:
      data = await notion.blocks.children.list({
        block_id: pageId,
      })
      break
    default:
      break
  }
  return data
}

export default getPage
