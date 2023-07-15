import 'server-only'

import { addDays, format } from 'date-fns'
// import { cache } from 'react'

import { notion } from '../helper'
import type { FilterType, SortItem } from '../Notion.types'
import type { SegmentInfo } from '../utils/getSegmentInfo'

const isDev = process.env.NODE_ENV === 'development'
const DATABASE_ID = process.env.NOTION__DATABASE__PAGES ?? ''

type GetDatabaseQueryTypes = {
  database_id?: string
  filterType?: FilterType
  segmentInfo: SegmentInfo
  sortProperty?: SortItem
}

/**
 * @note(notion) development pseudo preview
 */
const isPublishedAnd = isDev
  ? {
      timestamp: 'created_time',
      created_time: {
        after: '2020-01-01T00:00:00.000Z',
      },
    }
  : {
      property: 'Is.Published',
      checkbox: {
        equals: true,
      },
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
    database_id: !!database_id ? database_id : DATABASE_ID,
    filter,
    sorts,
  }

  // console.dir(`> options`)
  // console.dir(options)

  // @ts-expect-error Property 'is_not_empty' is missing in type
  const response = await notion.databases.query(options)

  return response
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
      ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        `${year}-${('00' + month).substr(-2)}-${('00' + date).substr(
          -2
        )}T00:00:00.000Z`
      : // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        `${year}-${('00' + month).substr(-2)}-${('00' + date).substr(
          -2
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
        property,
        date: {
          on_or_after: from,
        },
      },
      {
        property,
        date: {
          on_or_before: to,
        },
      },
    ],
  }
  const sortsData: SortItem[] = [
    {
      property: 'Date',
      direction: 'descending',
    },
  ]
  const filter = filterData
  const sorts = sortsData

  const options = {
    database_id: !!database_id ? database_id : DATABASE_ID,
    filter,
    sorts,
  }

  const response = await notion.databases.query(options)

  return response
}
// )

export { getDatabaseQuery, getDatabaseQueryByDateRange }
export type { GetDatabaseQueryTypes }
