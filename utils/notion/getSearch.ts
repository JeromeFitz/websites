import { notion, DATABASES, TYPES } from '~utils/notion/helper'
import lpad from '~utils/lpad'

const getSearch = async (pathVariables, preview) => {
  let data

  console.dir(`pathVariables`)
  console.dir(pathVariables)

  const andFilters = []
  !preview &&
    andFilters.push({
      property: 'Published',
      checkbox: {
        equals: true,
      },
    })

  switch (pathVariables.routeType) {
    case TYPES.events:
      /**
       * @query
       */
      const [, year, month, day, slug] = pathVariables.url.split('/')
      console.dir(`year: ${year}`)
      console.dir(`month: ${month}`)
      console.dir(`day: ${day}`)
      console.dir(`slug: ${slug}`)
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
            on_or_after: '2020-09-01',
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
            on_or_after: `${year}-01-01`,
            // before: `${parseInt(year) + 1}-01-02`,
          },
        })
      year !== undefined &&
        month === undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            // on_or_after: `${year}-01-02`,
            before: `${parseInt(year) + 1}-01-01`,
          },
        })

      month !== undefined &&
        year !== undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after: `${year}-${lpad(parseInt(month))}-01`,
            // before: `${year}-${lpad(parseInt(month) + 1)}-02`,
          },
        })
      month !== undefined &&
        year !== undefined &&
        day === undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            // on_or_after: `${year}-${lpad(parseInt(month))}-02`,
            before: `${year}-${lpad(parseInt(month) + 1)}-01`,
          },
        })

      day !== undefined &&
        year !== undefined &&
        month !== undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            on_or_after: `${year}-${month}-${lpad(parseInt(day))}`,
          },
        })
      day !== undefined &&
        year !== undefined &&
        month !== undefined &&
        andFilters.push({
          property: 'Date',
          date: {
            before: `${year}-${month}-${lpad(parseInt(day) + 3)}`,
          },
        })

      console.dir(`andFilters`)
      console.dir(andFilters)

      data = await notion.databases.query({
        database_id: pathVariables.isPage
          ? DATABASES[TYPES.seo]
          : DATABASES[TYPES.events],
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
        andFilters.push({
          property: 'Slug',
          text: {
            equals:
              pathVariables.isIndex && !pathVariables.slug
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
      data = await notion.databases.query({
        database_id: pathVariables.isIndex
          ? DATABASES[TYPES.seo]
          : DATABASES[TYPES.shows],
        filter: {
          and: andFilters,
        },
      })
      break
    default:
      break
  }
  return data
}

export default getSearch
