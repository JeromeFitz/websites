import { notionPleaseDeprecate as notion } from '@jeromefitz/temp/package/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const getPages = async ({ pageId }) => {
  await avoidRateLimit()
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

export default getPages
