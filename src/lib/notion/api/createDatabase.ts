import { notionPleaseDeprecate as notion } from '@jeromefitz/temp/package/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const createDatabase = async (data) => {
  await avoidRateLimit()
  return await notion.databases.create({ ...data })
}

export default createDatabase
