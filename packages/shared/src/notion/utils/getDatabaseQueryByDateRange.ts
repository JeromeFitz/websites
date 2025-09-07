import { getDatabaseQueryByDateRange as _getDatabaseQueryByDateRange } from 'next-notion/queries/index'
// @todo(types) next-notion
// import type { GetDatabaseQueryTypes } from 'next-notion/queries/index'
import { cache } from 'react'

const getDatabaseQueryByDateRange = cache(
  async ({
    database_id,

    filterType = 'equals',
    segmentInfo,

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
