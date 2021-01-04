const isDebug = false

const getCollectionViewWithString = ({
  indexCollectionView,
  preview,
  property,
  slug,
}) => {
  isDebug && console.dir(`> getCollectionViewWithString`)
  isDebug && console.dir(indexCollectionView)
  // isDebug && console.dir(` preview: ${preview}`)
  isDebug && console.dir(` property: ${property}`)
  isDebug && console.dir(` slug: ${slug}`)
  if (slug && property) {
    indexCollectionView.query.filter.filters[0] = {
      filter: {
        value: { type: 'exact', value: slug },
        operator: 'string_is',
      },
      property,
    }
  }
  // const previewData
  if (preview) {
    isDebug && console.warn(`___ preview: ${preview} => remove?`)
    indexCollectionView.query.filter.filters.splice(1, 1)
  }
  /**
   * SLUG: DELETE if we do not have it (and have already CREATED the filter)
   */
  if (!slug && indexCollectionView.query.filter.filters[0]) {
    indexCollectionView.query.filter.filters.splice(0, 1)
  }
  // if (!preview) {
  //   console.warn(`___ preview: ${preview} => put back?`)
  // }
  return indexCollectionView
}

// const getKeyByValue = (obj, value) =>
//   Object.keys(obj).find((key) => obj[key] === value)

export default getCollectionViewWithString
