import { getSchemaKey } from '~config/notion/schema/getSchema'
import { merged } from '~config/notion/website'
import loader from '~lib/notion/helpers/loader'
import getCollectionViewWithItemDate from '~lib/notion/utils/getCollectionViewWithItemDate'
import getCollectionViewWithMultiSelect from '~lib/notion/utils/getCollectionViewWithMultiSelect'
import getCollectionViewWithString from '~lib/notion/utils/getCollectionViewWithString'

const isDebug = false

const generateQueryCollection = ({
  collectionId,
  collectionViewId,
  indexId,
  itemDate = null,
  preview = false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  routeType = null,
  slug = null,
}) => {
  isDebug && console.dir(`> generateQueryCollectionPayload`)
  // isDebug && console.dir(`> getCollectionViewWithString`)
  isDebug && console.dir(indexId)
  isDebug && console.dir(collectionId)
  isDebug && console.dir(collectionViewId)

  isDebug && console.dir(`slug: ${slug}`)
  isDebug && console.dir(`routeType: ${routeType}`)
  // isDebug && console.dir(`merged: `)
  // isDebug && console.dir(merged)

  const indexCollection = merged[indexId]
  // isDebug && console.dir(`>> indexCollection`)
  // isDebug && console.dir(indexCollection)

  // const schemaPublished = _findKey(indexCollection.schema, {
  //   name: 'Published',
  // })
  // const schemaSlug = _findKey(indexCollection.schema, {
  //   name: 'Slug',
  // })
  const schemaPublished = getSchemaKey('Published')
  const schemaSlug = getSchemaKey('Slug')

  isDebug && console.dir(`schemaPublished: ${schemaPublished}`)
  isDebug && console.dir(`schemaSlug: ${schemaSlug}`)

  let indexCollectionView = indexCollection.collectionViewIds[collectionViewId]
  isDebug && console.dir(`>> indexCollectionView`)
  isDebug && console.dir(indexCollectionView)

  if (!!itemDate && !slug) {
    isDebug && console.dir(`> generateQueryCollection: !!itemDate`)
    isDebug && console.dir(itemDate)
    indexCollectionView = getCollectionViewWithItemDate({
      indexCollectionView,
      itemDate,
      slug,
      property: schemaSlug,
    })
  }

  /**
   * slug
   */
  if (slug && schemaSlug) {
    isDebug && console.dir(`> generateQueryCollection: slug && schemaSlug`)
    indexCollectionView = getCollectionViewWithString({
      indexCollectionView,
      preview,
      property: schemaSlug,
      slug,
    })
  }

  /**
   * podcastEpisodes
   */
  const schemaTags = getSchemaKey('Tags')
  if (routeType === 'podcastEpisodes') {
    isDebug && console.dir(`> generateQueryCollection: podcastEpisodes`)
    indexCollectionView = getCollectionViewWithMultiSelect({
      indexCollectionView,
      preview,
      property: schemaTags,
      slug,
    })
  }

  /**
   * @note Testing to get Episodes from Podcast
   */
  // let indexIdTemp = 'f09fac69-3045-46cc-9209-44b13665bada'
  // let collectionViewIdTemp = 'c97aac1e-166e-4657-8cf2-8712f280505d'
  // const schemaTags = getSchemaKey('Tags')

  // // indexCollection = merged[indexIdTemp]
  // // indexCollectionView = indexCollection.collectionViewIds[collectionViewIdTemp]
  // // indexCollectionView = getCollectionViewWithMultiSelect({
  // //   indexCollectionView,
  // //   preview,
  // //   property: schemaTags,
  // //   slug,
  // // })

  const schema = indexCollection.schema
  const payload = indexCollectionView
    ? {
        // indexId,
        collectionId,
        collectionViewId,
        // collectionId: 'cd6f2e2f-3e1d-482b-9891-530501f1c797',
        // collectionViewId: collectionViewIdTemp,
        query: indexCollectionView.query,
        loader,
      }
    : {}

  return { payload, schema }
}

export default generateQueryCollection
