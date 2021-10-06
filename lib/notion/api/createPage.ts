import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const createPage = async (data) => {
  await avoidRateLimit()
  return await notion.pages.create({ ...data })
}

export default createPage
