import { notionPleaseDeprecate as notion } from '@jeromefitz/temp/package/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const updateDatabase = async ({ database_id, properties }) => {
  if (!database_id) return []
  await avoidRateLimit()
  return await notion.databases.update({ database_id, properties })
}

export default updateDatabase
