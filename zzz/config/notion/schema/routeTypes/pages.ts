import getSchema, { getSchemaKey } from '~config/notion/schema/getSchema'
import { routeTypes } from '~config/notion/website'

const routeType = 'pages'
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

const Pages = {
  [id]: {
    id,
    seoId,
    slug,
    name: 'Pages',
    icon: '📜️',
    description: [['Description of Pages']],
    schema,
    collectionId,
    collectionViewIds: {
      [collectionViewId]: {
        id: collectionViewId,
        slug: 'default',
        title: 'Default View',
        description: 'Default View',
        query: {
          // filter: {
          //   filters: [
          //     {
          //       property: getSchemaKey('Published'),
          //       filter: {
          //         operator: 'checkbox_is',
          //         value: {
          //           type: 'exact',
          //           value: true,
          //         },
          //       },
          //     },
          //   ],
          //   operator: 'and',
          // },
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
                    value: 'homepage',
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

export default Pages
