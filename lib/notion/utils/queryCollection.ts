import rpc from '~lib/notion/rpc'

const queryCollection = ({
  collectionId,
  collectionViewId,
  loader = {},
  query = {},
}: any) => {
  const {
    loadContentCover = true,
    type = 'table',
    userLocale = 'en',
    userTimeZone = 'America/New_York',
    limit = 999, // TODO: figure out Notion's way of handling pagination
  } = loader

  const {
    aggregate = [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table',
      },
    ],
    filter = [],
    filter_operator = 'and',
    sort = [],
  } = query

  return rpc('queryCollection', {
    collectionId,
    collectionViewId,
    loader: {
      loadContentCover,
      type,
      userLocale,
      userTimeZone,
      limit,
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort,
    },
  })
}

export default queryCollection
