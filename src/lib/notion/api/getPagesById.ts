import { notion } from '@jeromefitz/notion/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const getPagesById = async ({ pageId }) => {
  await avoidRateLimit()
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

export default getPagesById
