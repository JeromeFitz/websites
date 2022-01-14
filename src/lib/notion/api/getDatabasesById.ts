import avoidRateLimit from '@jeromefitz/notion/utils/avoidRateLimit'

import { notion } from '~lib/notion/helper'

// @todo(tyoes)
const getDatabasesById = async ({ databaseId }) => {
  if (!databaseId) return []
  await avoidRateLimit()
  return await notion.databases.retrieve({ database_id: databaseId })
}

export default getDatabasesById
