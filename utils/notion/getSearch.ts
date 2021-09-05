import _addDays from 'date-fns/addDays'
import _addMonths from 'date-fns/addMonths'
import _addYears from 'date-fns/addYears'

import { notion, DATABASES, TYPES } from '~utils/notion/helper'
// import lpad from '~utils/lpad'

const dateTimestamp = new Date().toISOString()
const dateTimestampBlog = new Date('2020-01-01').toISOString()

const addTime = (date, type) => {
  switch (type) {
    case 'year':
      return _addYears(date, 1).toISOString()
    case 'month':
      return _addMonths(date, 1).toISOString()
    case 'day':
      // @hack the TimeZone to UTC is ... not great.
      return _addDays(date, 2).toISOString()
  }
  return _addDays(date, -1).toISOString()
}

const getSearch = async (pathVariables, preview) => {
  let data

  // console.dir(`pathVariables`)
  // console.dir(pathVariables)

  const andFilters = []
  !preview &&
    andFilters.push({
      property: 'Published',
      checkbox: {
        equals: true,
      },
    })

  switch (pathVariables.routeType) {
    case TYPES.blog:
    case TYPES.events:
      /**
       * @query
       */
      const [, year, month, day, slug] = pathVariables.url.split('/')
      // console.dir(`year: ${year}`)
      // console.dir(`month: ${month}`)
      // console.dir(`day: ${day}`)
      // console.dir(`slug: ${slug}`)

      const timestampQuery = new Date(
        `${!!year ? year : dateTimestamp.slice(0, 4)}-${!!month ? month : '01'}-${
          !!day ? day : '01'
        }`
      )
      // console.dir(`dateTimestampBlog: ${dateTimestampBlog}`)
      // console.dir(`dateTimestamp:     ${dateTimestamp}`)
      // console.dir(`dateTimestamp:     ${dateTimestamp.slice(0, 4)}`)
      // console.dir(`timestampQuery:    ${timestampQuery.toISOString()}`)
      // console.dir(`timestampQuery+1:  ${addTime(timestampQuery, 'year')}`)
      // console.dir(`timestampQuery+2:  ${addTime(timestampQuery, 'month')}`)
      // console.dir(`timestampQuery+3:  ${addTime(timestampQuery, 'day')}`)
      /**
       * @test Need to remove this
       */
      !!pathVariables.isIndex &&
        year === undefined &&
        month === undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after:
              TYPES.blog === pathVariables.routeType
                ? dateTimestampBlog
                : dateTimestamp,
          },
        })

      slug !== undefined &&
        andFilters.push({
          property: 'Slug',
          text: {
            equals:
              pathVariables.isIndex && !pathVariables.slug
                ? pathVariables.routeType
                : pathVariables.slug,
          },
        })

      year !== undefined &&
        month === undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after: addTime(timestampQuery, ''),
          },
        })
      year !== undefined &&
        month === undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            before: addTime(timestampQuery, 'year'),
          },
        })

      month !== undefined &&
        year !== undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after: addTime(timestampQuery, ''),
          },
        })
      month !== undefined &&
        year !== undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            before: addTime(timestampQuery, 'month'),
          },
        })

      day !== undefined &&
        year !== undefined &&
        month !== undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after: addTime(timestampQuery, ''),
          },
        })
      day !== undefined &&
        year !== undefined &&
        month !== undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            before: addTime(timestampQuery, 'day'),
          },
        })

      // console.dir(`andFilters`)
      // console.dir(andFilters)

      data = await notion.databases.query({
        database_id: pathVariables.isPage
          ? DATABASES[TYPES.seo]
          : DATABASES[pathVariables.routeType],
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
        filter: {
          and: andFilters,
        },
      })
      break
    case TYPES.shows:
      pathVariables.slug !== undefined &&
        pathVariables.slug !== pathVariables.routeType &&
        andFilters.push({
          property: 'Slug',
          text: {
            equals: pathVariables.isIndex
              ? pathVariables.routeType
              : pathVariables.slug,
          },
        })

      /**
       * @search
       */
      // searchResponse = await notion.search({
      //   query: 'shows',
      //   sort: {
      //     direction: 'ascending',
      //     timestamp: 'last_edited_time',
      //   },
      //   filter: {
      //     value: 'database',
      //     property: 'object',
      //   },
      // })
      /**
       * @query
       */
      // data = await notion.databases.query({
      //   database_id: pathVariables.isIndex
      //     ? DATABASES[TYPES.seo]
      //     : DATABASES[TYPES.shows],
      //   filter: {
      //     and: andFilters,
      //   },
      // })
      // console.dir(`andFilters`)
      // console.dir(andFilters)

      data = await notion.databases.query({
        database_id: pathVariables.isPage
          ? DATABASES[TYPES.seo]
          : DATABASES[pathVariables.routeType],
        sorts: [
          {
            property: 'Title',
            direction: 'ascending',
          },
        ],
        filter: {
          and: andFilters,
        },
      })
      break
    default:
      pathVariables.slug !== undefined &&
        pathVariables.slug !== pathVariables.routeType &&
        andFilters.push({
          property: 'Slug',
          text: {
            equals: pathVariables.slug,
          },
        })
      // console.dir(`andFilters`)
      // console.dir(andFilters)
      data = await notion.databases.query({
        database_id: DATABASES[pathVariables.routeType],
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
        filter: {
          and: andFilters,
        },
      })
      break
  }
  return data
}

export default getSearch
