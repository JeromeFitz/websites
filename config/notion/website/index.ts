// @note This needs to be the first import 😑️
import routeTypes from '~config/notion/website/jerandky.com/routeTypes'

import getNextSeo from '~config/notion/website/jerandky.com/getNextSeo'
import getRedirects from '~config/notion/website/jerandky.com/getRedirects'

import {
  getCache,
  isPages,
  merged,
  notion,
  routeTypesArray,
  urlBase,
} from '~config/notion/website/jerandky.com'

export {
  getCache,
  getNextSeo,
  getRedirects,
  isPages,
  merged,
  notion,
  routeTypes,
  routeTypesArray,
  urlBase,
}

export default routeTypes
