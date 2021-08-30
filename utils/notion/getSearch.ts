import { notion, DATABASES, TYPES } from '~utils/notion/helper'

const getSearch = async (pathVariables, preview) => {
  let data

  console.dir(pathVariables)

  switch (pathVariables.routeType) {
    case TYPES.shows:
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
          and: [
            {
              property: 'Slug',
              text: {
                equals:
                  pathVariables.isIndex && !pathVariables.slug
                    ? pathVariables.routeType
                    : pathVariables.slug,
              },
            },
            // Remove Filter if preview is True
            !preview && {
              property: 'Published',
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      })
      break
    default:
      break
  }
  return data
}

export default getSearch
