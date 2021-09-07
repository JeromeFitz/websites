import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'
import { routeTypes } from '~config/notion/website'

const routeType = 'seo'
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

const RouteTypes = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'SEO',
    icon: '🌐️',
    description: [['Description of SEO']],
    schema,
    collectionId,
    collectionViewIds: {
      [collectionViewId]: {
        id: collectionViewId,
        slug: 'default',
        title: 'Default View',
        description: 'Default View',
        query: {
          group_by: getSchemaKey('Authors'),
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
                property: getSchemaKey('Slug'),
                filter: {
                  operator: 'string_is',
                  value: {
                    type: 'exact',
                    value: 'blog',
                  },
                },
              },
              {
                property: getSchemaKey('Published'),
                filter: {
                  operator: 'checkbox_is',
                  value: {
                    type: 'exact',
                    value: true,
                  },
                },
              },
            ],
            operator: 'and',
          },
          group_by: getSchemaKey('Authors'),
        },
      },
    },
  },
}

export default RouteTypes
