import lpad from '~utils/lpad'

const getCollectionViewWithItemDate = ({
  indexCollectionView,
  itemDate,
  slug,
  property,
}) => {
  if (itemDate?.date) {
    const year = parseInt(itemDate.year)
    const month = parseInt(itemDate.month)
    const date = parseInt(itemDate.date)
    const dateString = `${year}-${lpad(month)}-${lpad(date)}`
    indexCollectionView.query.filter.filters[1].filter.value.value.start_date = dateString
    /**
     * SLUG: CREATE if we have it
     */
    if (slug) {
      indexCollectionView.query.filter.filters[2] = {
        filter: {
          value: { type: 'exact', value: slug },
          operator: 'string_is',
        },
        property,
      }
    }
    /**
     * SLUG: DELETE if we do not have it (and have already CREATED the filter)
     */
    if (!slug && indexCollectionView.query.filter.filters[2]) {
      indexCollectionView.query.filter.filters.splice(2, 1)
    }
    return indexCollectionView
  }
  if (itemDate?.month) {
    const year = parseInt(itemDate.year)
    const month = parseInt(itemDate.month)
    const after = `${year}-${lpad(month)}-01`
    let before
    if (month === 12) {
      before = `${year + 1}-01-01`
    } else {
      before = `${year}-${lpad(month + 1)}-01`
    }
    indexCollectionView.query.filter.filters[1].filter.value.value.start_date = after
    indexCollectionView.query.filter.filters[2].filter.value.value.start_date = before
    return indexCollectionView
  }
  if (itemDate?.year) {
    const year = parseInt(itemDate.year)
    const after = `${year}-01-01`
    const before = `${year + 1}-01-01`
    indexCollectionView.query.filter.filters[1].filter.value.value.start_date = after
    indexCollectionView.query.filter.filters[2].filter.value.value.start_date = before

    return indexCollectionView
  }
  return indexCollectionView
}

export default getCollectionViewWithItemDate
