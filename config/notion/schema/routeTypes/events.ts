import { routeTypes } from '~config/notion/website'
import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'

const routeType = 'events'
const routeTypeSchema = routeTypes[routeType].schema
const schema = getSchema(routeTypeSchema)

const {
  id: slug,
  indexId: id,
  collectionId,
  collectionViewId,
  collectionViewId__published,
  collectionViewId__upcomingEvents,
  collectionViewId__dateExactMonth,
  collectionViewId__dateExactDate,
  seoId,
} = routeTypes[routeType]

const events = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'Events',
    icon: '🗓️',
    description: [['Description of Events']],
    schema,
    collectionId,
    collectionViewIds: {
      [collectionViewId]: {
        id: collectionViewId,
        slug: 'default',
        title: 'Default View',
        description: 'Default View',
        query: {
          sort: [{ property: getSchemaKey('Date'), direction: 'ascending' }],
          aggregations: [
            {
              property: 'title',
              aggregator: 'count',
            },
          ],
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
      [collectionViewId__upcomingEvents]: {
        id: collectionViewId__upcomingEvents,
        slug: 'upcoming-events',
        title: 'Upcoming Events',
        description: 'Upcoming Events',
        query: {
          sort: [{ property: getSchemaKey('Date'), direction: 'ascending' }],
          filter: {
            filters: [
              {
                filter: {
                  value: {
                    type: 'relative',
                    value: 'today',
                  },
                  operator: 'date_is_on_or_after',
                },
                property: getSchemaKey('Date'),
              },
              {
                filter: {
                  value: {
                    type: 'relative',
                    value: 'one_month_from_now',
                  },
                  operator: 'date_is_before',
                },
                property: getSchemaKey('Date'),
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
              // {
              //   filter: {
              //     value: { type: 'exact', value: 'Sketch' },
              //     operator: 'enum_contains',
              //   },
              //   property: '?>S*',
              // },
            ],
            operator: 'and',
          },
          aggregations: [
            {
              property: 'title',
              aggregator: 'count',
            },
          ],
        },
      },
      [collectionViewId__dateExactMonth]: {
        id: collectionViewId__dateExactMonth,
        slug: 'date-exact-month',
        title: 'Date: Exact Month',
        description: 'Date: Exact Month (2020-04)',
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
                    value: { type: 'date', start_date: '2020-04-01' },
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
        description: 'Date: Exact Date (2020-04-17)',
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
                    value: { type: 'date', start_date: '2020-04-17' },
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

export default events
