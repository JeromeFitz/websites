import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const createDatabase = async (data) => {
  await avoidRateLimit()
  return await notion.databases.create({ ...data })
}

export default createDatabase
