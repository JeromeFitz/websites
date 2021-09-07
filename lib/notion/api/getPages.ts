import { notion } from '~utils/notion/helper'

const getPages = async ({ pageId }) => {
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

export default getPages
