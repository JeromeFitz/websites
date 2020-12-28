// @note This needs to be the first import 😑️
import routeTypes from '~config/notion/website/jeromefitzgerald.com/routeTypes'

import getNextSeo from '~config/notion/website/jeromefitzgerald.com/getNextSeo'
import getRedirects from '~config/notion/website/jeromefitzgerald.com/getRedirects'

import {
  getCache,
  isPages,
  merged,
  notion,
  routeTypesArray,
} from '~config/notion/website/jeromefitzgerald.com'

export {
  getCache,
  getNextSeo,
  getRedirects,
  isPages,
  merged,
  notion,
  routeTypes,
  routeTypesArray,
}

export default routeTypes
