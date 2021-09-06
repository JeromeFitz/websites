import { notion, PROPERTIES, QUERIES } from '~utils/notion/helper'

const mock: any = {
  filter: {
    and: [
      // {
      //   property: PROPERTIES.published,
      //   checkbox: {
      //     equals: false,
      //   },
      // },
      // {
      //   property: PROPERTIES.slug,
      //   text: {
      //     equals: 'jerome-fitzgerald',
      //   },
      // },
    ],
  },
  sorts: [
    {
      property: PROPERTIES.date,
      direction: 'descending',
    },
  ],
}

// mock.filter.and.push({
//   ...QUERIES.published,
// })
// mock.filter.and.push({
//   ...QUERIES.slug,
//   text: { equals: 'alex-o-jerome' },
// })

const getDatabasesByIdQuery = async ({
  databaseId,
  sorts = mock.sorts,
  filter = mock.filter,
}) => {
  console.dir(databaseId)
  console.dir(sorts)
  return await notion.databases.query({
    database_id: databaseId,
    sorts,
    filter,
  })
}

export default getDatabasesByIdQuery
