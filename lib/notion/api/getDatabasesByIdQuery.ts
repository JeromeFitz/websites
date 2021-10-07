import avoidRateLimit from '~utils/avoidRateLimit'
import { notion, PROPERTIES } from '~utils/notion/helper'

const mock: any = {
  sorts: [
    {
      property: PROPERTIES.slug,
      direction: 'ascending',
    },
  ],
}

const getDatabasesByIdQuery = async ({
  databaseId,
  sorts = mock.sorts,
  filter = mock.filter,
}) => {
  if (!databaseId) return null
  await avoidRateLimit()
  return await notion.databases.query({
    database_id: databaseId,
    sorts,
    filter,
  })
}

export default getDatabasesByIdQuery
