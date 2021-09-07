import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'
import { routeTypes } from '~config/notion/website'

console.dir(`> ~config/schema/routeTypes/blog`)
console.dir(`>> routeTypes`)
console.dir(routeTypes)

const routeType = 'blog'
const routeTypeSchema = routeTypes[routeType].schema
const schema = getSchema(routeTypeSchema)

// console.dir(`>> routeType`)
// console.dir(routeType)
// console.dir(`>> routeTypeSchema`)
// console.dir(routeTypeSchema)
// console.dir(`>> schema`)
// console.dir(schema)

const {
  id: slug,
  indexId: id,
  collectionId,
  collectionViewId,
  collectionViewId__published,
  collectionViewId__slug,
  collectionViewId__dateExactMonth,
  collectionViewId__dateExactDate,
  seoId,
} = routeTypes[routeType]

const blog = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'Blog',
    icon: '📝️',
    description: [['Description of Blog']],
    schema,
    collectionId,
    collectionViewIds: {
      [collectionViewId]: {
        id: collectionViewId,
        slug: 'default',
        title: 'Default View',
        description: 'Default View',
        query: {
          aggregations: [
            {
              property: 'title',
              aggregator: 'count',
            },
          ],
          sort: [{ property: getSchemaKey('Date'), direction: 'descending' }],
        },
      },
      [collectionViewId__published]: {
        id: collectionViewId__published,
        slug: 'published',
        title: 'Query: Published',
        description: 'Query: Published',
        query: {
          filter: {
            filters: [
              {
                filter: {
                  value: {
                    type: 'exact',
                    value: true,
                  },
                  operator: 'checkbox_is',
                },
                property: getSchemaKey('Published'),
              },
            ],
            operator: 'and',
          },
          aggregations: [
            {
              property: 'title',
              aggregator: 'count',
            },
          ],
          sort: [{ property: getSchemaKey('Date'), direction: 'descending' }],
        },
      },
      [collectionViewId__slug]: {
        id: collectionViewId__slug,
        slug: 'slug',
        title: 'Query: Slug',
        description: 'Query: Slug',
        query: {
          filter: {
            filters: [
              {
                filter: {
                  value: {
                    type: 'exact',
                    value: 'events-postponed-because-of-covid-19',
                  },
                  operator: 'string_is',
                },
                property: getSchemaKey('Slug'),
              },
              {
                filter: {
                  value: {
                    type: 'exact',
                    value: true,
                  },
                  operator: 'checkbox_is',
                },
                property: getSchemaKey('Published'),
              },
            ],
            operator: 'and',
          },
          aggregations: [
            {
              property: 'title',
              aggregator: 'count',
            },
          ],
          sort: [{ property: getSchemaKey('Date'), direction: 'descending' }],
        },
      },
      [collectionViewId__dateExactMonth]: {
        id: collectionViewId__dateExactMonth,
        slug: 'date-exact-month',
        title: 'Date: Exact Month',
        description: 'Date: Exact Month (2020-03)',
        query: {
          aggregations: [{ property: 'title', aggregator: 'count' }],
          sort: [{ property: getSchemaKey('Date'), direction: 'descending' }],
          filter: {
            operator: 'and',
            filters: [
              {
                property: getSchemaKey('Published'),
                filter: {
                  operator: 'checkbox_is',
                  value: { type: 'exact', value: true },
                },
              },
              {
                property: getSchemaKey('Date'),
                filter: {
                  operator: 'date_is_on_or_after',
                  value: {
                    type: 'exact',
                    value: { type: 'date', start_date: '2020-03-01' },
                  },
                },
              },
              {
                property: getSchemaKey('Date'),
                filter: {
                  operator: 'date_is_before',
                  value: {
                    type: 'exact',
                    value: { type: 'date', start_date: '2020-05-01' },
                  },
                },
              },
            ],
          },
        },
      },
      [collectionViewId__dateExactDate]: {
        id: collectionViewId__dateExactDate,
        slug: 'date-exact-date',
        title: 'Date: Exact Date',
        description: 'Date: Exact Date (2020-03-09)',
        query: {
          aggregations: [{ property: 'title', aggregator: 'count' }],
          sort: [{ property: getSchemaKey('Date'), direction: 'descending' }],
          filter: {
            operator: 'and',
            filters: [
              {
                property: getSchemaKey('Published'),
                filter: {
                  operator: 'checkbox_is',
                  value: { type: 'exact', value: true },
                },
              },
              {
                property: getSchemaKey('Date'),
                filter: {
                  operator: 'date_is',
                  value: {
                    type: 'exact',
                    value: { type: 'date', start_date: '2020-05-30' },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
}

export default blog
