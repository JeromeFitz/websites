import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'
import { routeTypes } from '~config/notion/website'

const routeType = 'episodes'
const routeTypeSchema = routeTypes[routeType].schema
const schema = getSchema(routeTypeSchema)

const {
  id: slug,
  indexId: id,
  collectionId,
  collectionViewId,
  collectionViewId__published,
  collectionViewId__slug,
  collectionViewId__podcast,
  seoId,
} = routeTypes[routeType]

const episodes = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'Episodes',
    icon: '📇️',
    description: [['Description of Episodes']],
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
                    value: 's01e01--i-know-what-you-did-last-summer',
                  },
                  operator: 'string_is',
                },
                property: getSchemaKey('Slug'),
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
        },
      },
      [collectionViewId__podcast]: {
        id: collectionViewId__podcast,
        slug: 'podcast',
        title: 'Query: Podcast (Tags)',
        description: 'Query: Podcast (Tags)',
        query: {
          filter: {
            filters: [
              {
                filter: {
                  value: {
                    type: 'exact',
                    value: 'knockoffs',
                  },
                  operator: 'enum_contains',
                },
                property: getSchemaKey('Tags'),
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
          sort: [
            {
              property: getSchemaKey('Date.Published'),
              direction: 'descending',
            },
          ],
        },
      },
    },
  },
}

export default episodes
