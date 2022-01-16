import avoidRateLimit from '@jeromefitz/notion/utils/avoidRateLimit'

import { notion } from '~lib/notion/helper'

const getPages = async ({ pageId }) => {
  if (!pageId) return []
  await avoidRateLimit()
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

export default getPages
