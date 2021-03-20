// @note This needs to be the first import 😑️
import routeTypes from '~config/notion/website/jeromefitzgerald.com/routeTypes'

import getNextSeo from '~config/notion/website/jeromefitzgerald.com/getNextSeo'
import getRedirects from '~config/notion/website/jeromefitzgerald.com/getRedirects'

import {
  getCache,
  isPages,
  merged,
  navigation,
  notion,
  routeTypesArray,
} from '~config/notion/website/jeromefitzgerald.com'

const urlBase = `https://${process.env.NEXT_PUBLIC__SITE}/`

export {
  getCache,
  getNextSeo,
  getRedirects,
  isPages,
  merged,
  navigation,
  notion,
  routeTypes,
  routeTypesArray,
  urlBase,
}

export default routeTypes
