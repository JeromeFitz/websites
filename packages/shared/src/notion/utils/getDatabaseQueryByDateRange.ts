import { getDatabaseQueryByDateRange as _getDatabaseQueryByDateRange } from 'next-notion/queries'
// @todo(types) next-notion
// import type { GetDatabaseQueryTypes } from 'next-notion/queries'
import { cache } from 'react'

const getDatabaseQueryByDateRange = cache(
  async ({
    database_id,

    filterType = 'equals',
    segmentInfo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortProperty,
    // }: GetDatabaseQueryTypes) => {
  }: any) => {
    return await _getDatabaseQueryByDateRange({
      database_id,
      filterType,
      segmentInfo,
    })
  },
)

export { getDatabaseQueryByDateRange }
