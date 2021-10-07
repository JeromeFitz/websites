import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const getDatabasesById = async ({ databaseId }) => {
  if (!databaseId) return null
  await avoidRateLimit()
  return await notion.databases.retrieve({ database_id: databaseId })
}

export default getDatabasesById
