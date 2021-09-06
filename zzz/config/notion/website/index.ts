// @note This needs to be the first import 😑️
import {
  getCache,
  isPages,
  merged,
  navigation,
  notion,
  routeTypesArray,
} from '~config/notion/website/jeromefitzgerald.com'
import getNextSeo from '~config/notion/website/jeromefitzgerald.com/getNextSeo'
import getRedirects from '~config/notion/website/jeromefitzgerald.com/getRedirects'
import routeTypes from '~config/notion/website/jeromefitzgerald.com/routeTypes'

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
