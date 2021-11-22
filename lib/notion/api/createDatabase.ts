import { notion } from '~lib/notion/helper'
import avoidRateLimit from '~utils/avoidRateLimit'

const createDatabase = async (data) => {
  await avoidRateLimit()
  return await notion.databases.create({ ...data })
}

export default createDatabase
