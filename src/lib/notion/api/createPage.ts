import { notionPleaseDeprecate as notion } from '@jeromefitz/temp/package/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const createPage = async (data) => {
  await avoidRateLimit()
  return await notion.pages.create({ ...data })
}

export default createPage
