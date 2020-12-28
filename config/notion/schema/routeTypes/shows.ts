import { routeTypes } from '~config/notion/website'
import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'

const routeType = 'shows'
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

const shows = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'Shows',
    icon: '🤡️',
    description: [['Description of Shows']],
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
                property: getSchemaKey('Slug'),
                filter: {
                  operator: 'string_is',
                  value: {
                    type: 'exact',
                    value: 'alex-o-jerome',
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
      // '5305bc33-4254-4551-a483-57ed632c33be': {
      //   id: '5305bc33-4254-4551-a483-57ed632c33be',
      //   slug: 'query-tags',
      //   title: 'query: tag(s)',
      //   query: {
      //     filter: {
      //       filters: [
      //         {
      //           filter: {
      //             value: { type: 'exact', value: 'Sketch' },
      //             operator: 'enum_contains',
      //           },
      //           property: getSchemaKey('Tags'),
      //         },
      //       ],
      //       operator: 'and',
      //     },
      //     aggregations: [{ property: 'title', aggregator: 'count' }],
      //   },
      // },
    },
  },
}

export default shows
