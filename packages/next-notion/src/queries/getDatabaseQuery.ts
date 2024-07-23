import 'server-only'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { addDays, format } from 'date-fns'
// import { cache } from 'react'

import type { FilterType, SortItem } from '../Notion.types'
import type { SegmentInfo } from '../utils/getSegmentInfo'

import { notion } from '../helper'

const DATABASE_ID = envServer.NOTION__DATABASE__PAGES ?? ''

interface GetDatabaseQueryTypes {
  database_id?: string
  filterType?: FilterType
  segmentInfo: SegmentInfo
  sortProperty?: SortItem
}

/**
 * @note(notion) development pseudo preview
 */
const isPublishedAnd = envClient.IS__DEV
  ? {
      created_time: {
        after: '2020-01-01T00:00:00.000Z',
      },
      timestamp: 'created_time',
    }
  : {
      checkbox: {
        equals: true,
      },
      property: 'Is.Published',
    }

// const getDatabaseQuery = cache(
const getDatabaseQuery = async ({
  database_id,
  filterType = 'equals',
  segmentInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sortProperty,
}: GetDatabaseQueryTypes) => {
  const { slug } = segmentInfo
  const filterData = {
    and: [
      {
        property: 'Slug.Preview',
        rich_text: {
          [filterType]: slug,
        },
      },
      isPublishedAnd,
    ],
  }

  const sortsData: SortItem[] = []
  // const sortsData: SortItem[] = [
  //   {
  //     property: 'Date',
  //     direction: 'descending',
  //   },
  // ]

  const filter = filterData
  const sorts = sortsData

  const options = {
    database_id: database_id ? database_id : DATABASE_ID,
    filter,
    page_size: 100, // max
    sorts,
  }

  /**
   * @todo(notion) loop through cursors
   * @ref https://github.com/makenotion/notion-sdk-js/issues/147
   */
  // @ts-expect-error Property 'is_not_empty' is missing in type
  let _response = await notion.databases.query(options)
  let _results = _response?.results
  let i = 0
  while (_response.has_more && _response.next_cursor) {
    console.dir(`(╯°□°)╯︵ ┻━┻  ${slug} api request: has_more (${i})`)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _response = await notion.databases.query({
      ...options,
      start_cursor: _response.next_cursor,
    })

    const __results = _response.results
    _results = _results.concat(__results)
    i++
  }

  return { ..._response, results: _results }
  // return _response
}
// )

/**
 * @todo(notion) move this to a TYPE of `getDatabaseQuery`
 */
// @todo(types)
// const getNotionQueryDatePrepartion = cache((val, type) => {
const getNotionQueryDatePrepartion = (val, type) => {
  const year = val[0]
  const month = val[1]
  const date = val[2]
  const tsPrep =
    type === 'from'
      ? `${year}-${('00' + month).substr(-2)}-${('00' + date).substr(
          -2,
        )}T00:00:00.000Z`
      : `${year}-${('00' + month).substr(-2)}-${('00' + date).substr(
          -2,
        )}T23:59:59.999Z`
  const tsNew = new Date(tsPrep)
  if (type === 'to') {
    return format(addDays(tsNew, 1), 'yyyy-MM-dd')
  }
  return format(tsNew, 'yyyy-MM-dd')
}
// )

// const getDatabaseQueryByDateRange = cache(
const getDatabaseQueryByDateRange = async ({
  database_id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterType = 'equals',
  segmentInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sortProperty,
}: GetDatabaseQueryTypes) => {
  const { slug } = segmentInfo
  const property = 'Date'
  // @note(notion) first item is empty
  const slugArray = slug.split('/')
  const fromArray = slugArray.slice(2, 5)
  const toArray = slugArray.slice(6, 9)
  const from = getNotionQueryDatePrepartion(fromArray, 'from')
  const to = getNotionQueryDatePrepartion(toArray, 'to')

  const filterData = {
    and: [
      {
        date: {
          on_or_after: from,
        },
        property,
      },
      {
        date: {
          on_or_before: to,
        },
        property,
      },
    ],
  }
  const sortsData: SortItem[] = [
    {
      direction: 'descending',
      property: 'Date',
    },
  ]
  const filter = filterData
  const sorts = sortsData

  const options = {
    database_id: database_id ? database_id : DATABASE_ID,
    filter,
    sorts,
  }

  const response = await notion.databases.query(options)

  return response
}
// )

export { getDatabaseQuery, getDatabaseQueryByDateRange }
export type { GetDatabaseQueryTypes }
