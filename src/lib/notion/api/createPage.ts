import avoidRateLimit from '@jeromefitz/notion/utils/avoidRateLimit'

import { notion } from '~lib/notion/helper'

const createPage = async (data) => {
  if (!data) return []
  await avoidRateLimit()
  return await notion.pages.create({ ...data })
}

export default createPage
