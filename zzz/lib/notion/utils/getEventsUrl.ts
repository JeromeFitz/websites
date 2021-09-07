import lpad from '~utils/lpad'

const getEventsUrl = (url, itemDate = null, slug = null) => {
  if (!url) {
    console.warn('No "url" provided.')
  }
  let returnUrl = url
  if (itemDate && itemDate?.year) {
    returnUrl += `/${itemDate.year}`
  }
  if (itemDate && itemDate?.month) {
    returnUrl += `/${lpad(itemDate.month)}`
  }
  if (itemDate && itemDate?.date) {
    returnUrl += `/${lpad(itemDate.date)}`
  }
  if (itemDate && slug) {
    returnUrl += `/${slug}`
  }
  return returnUrl
}

export default getEventsUrl
