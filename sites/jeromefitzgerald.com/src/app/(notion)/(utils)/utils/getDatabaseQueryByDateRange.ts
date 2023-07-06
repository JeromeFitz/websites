import type { GetDatabaseQueryTypes } from 'next-notion/src/queries/getDatabaseQuery'
import { getDatabaseQueryByDateRange as _getDatabaseQueryByDateRange } from 'next-notion/src/queries/index'
import { cache } from 'react'

const getDatabaseQueryByDateRange = cache(
  async ({
    database_id,

    filterType = 'equals',
    segmentInfo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortProperty,
  }: GetDatabaseQueryTypes) => {
    return await _getDatabaseQueryByDateRange({
      database_id,
      filterType,
      segmentInfo,
    })
  }
)

export { getDatabaseQueryByDateRange }
