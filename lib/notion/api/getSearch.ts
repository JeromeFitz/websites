import { notion } from '~lib/notion/helper'
import avoidRateLimit from '~utils/avoidRateLimit'

const mock = {
  filter: {
    value: 'page',
    // value: 'database',
    property: 'object',
  },
  sort: {
    direction: 'ascending',
    timestamp: 'last_edited_time',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSearch = async ({ query, sort = mock.sort, filter = mock.filter }) => {
  await avoidRateLimit()
  return await notion.search({
    query,
  })
}

export default getSearch
