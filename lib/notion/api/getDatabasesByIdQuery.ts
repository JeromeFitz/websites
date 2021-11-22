import { PROPERTIES } from '~lib/notion/schema'
import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const mock: any = {
  sorts: [
    {
      property: PROPERTIES.slug.notion,
      direction: 'ascending',
    },
  ],
}

const getDatabasesByIdQuery = async ({
  databaseId,
  sorts = mock.sorts,
  filter = mock.filter,
}) => {
  if (!databaseId) return []
  await avoidRateLimit()
  return await notion.databases.query({
    database_id: databaseId,
    sorts,
    filter,
  })
}

export default getDatabasesByIdQuery
