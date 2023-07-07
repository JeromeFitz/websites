import 'server-only'

import { asyncForEach } from '@jeromefitz/utils'
import _noop from 'lodash/noop'

import { getBlockChildrenData } from './getBlockChildrenData'

async function getColumnData(columnListData) {
  const columnResults: any = []
  await asyncForEach(columnListData.results, async (columnData: any) => {
    const columnDataColumn = await getBlockChildrenData(columnData.id)
    const column = {
      ...columnData,
      columnDataColumn,
    }
    columnResults.push(column)
  }).catch(_noop)
  const columnList = {
    column_list: {
      ...columnListData,
      results: columnResults,
    },
  }
  return columnList
}

export { getColumnData }
