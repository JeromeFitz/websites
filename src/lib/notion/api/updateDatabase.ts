import avoidRateLimit from '@jeromefitz/notion/utils/avoidRateLimit'

import { notion } from '~lib/notion/helper'

const updateDatabase = async ({ database_id, properties }) => {
  if (!database_id) return []
  await avoidRateLimit()
  return await notion.databases.update({ database_id, properties })
}

export default updateDatabase
