import { notion } from '~lib/notion/helper'
import avoidRateLimit from '~utils/avoidRateLimit'

const getDatabasesById = async ({ databaseId }) => {
  if (!databaseId) return []
  await avoidRateLimit()
  return await notion.databases.retrieve({ database_id: databaseId })
}

export default getDatabasesById
