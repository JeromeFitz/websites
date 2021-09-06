import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'
import { routeTypes } from '~config/notion/website'

const routeType = 'people'
const routeTypeSchema = routeTypes[routeType].schema
const schema = getSchema(routeTypeSchema)

const {
  id: slug,
  indexId: id,
  collectionId,
  collectionViewId,
  collectionViewId__published,
  collectionViewId__slug,
  seoId,
} = routeTypes[routeType]

const people = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'People',
    icon: '🧑‍🤝‍🧑️',
    description: [['Description of People']],
    schema,
    collectionId: collectionId,
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
          sort: [{ property: 'title', direction: 'ascending' }],
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
                    value: 'jerome-fitzgerald',
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
          sort: [{ property: 'title', direction: 'ascending' }],
        },
      },
    },
  },
}

export default people
