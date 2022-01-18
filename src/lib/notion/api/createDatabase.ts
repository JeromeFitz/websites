import { avoidRateLimit } from '@jeromefitz/utils'

import { notion } from '~lib/notion/helper'

const createDatabase = async (data) => {
  if (!data) return []
  await avoidRateLimit()
  return await notion.databases.create({ ...data })
}

export default createDatabase
