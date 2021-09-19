import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const getDatabases = async () => {
  await avoidRateLimit()
  return await notion.databases.list()
}

export default getDatabases
