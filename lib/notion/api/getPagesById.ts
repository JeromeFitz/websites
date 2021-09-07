import { notion } from '~utils/notion/helper'

const getPagesById = async ({ pageId }) => {
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

export default getPagesById
