import { routeTypes } from '~config/notion/website'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCache = ({ id, routeType, slug }) => {
  const notionData: any = null
  let notionCache: any = null
  let notionIndex: any = null

  notionCache = routeTypes[routeType].cache
  notionIndex = routeTypes[routeType].indexId

  return {
    notionCache,
    notionData,
    notionIndex,
  }
}

export default getCache
