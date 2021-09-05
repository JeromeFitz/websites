import path from 'path'

import _isEqual from 'lodash/isEqual'
import _join from 'lodash/join'
import _last from 'lodash/last'
import _map from 'lodash/map'
import _uniqWith from 'lodash/uniqWith'

import { isPages } from '~config/notion/website'
import {
  getBlog,
  getBlogs,
  // getEpisode,
  // getEpisodes,
  getEvent,
  getEvents,
  getPage,
  // getPages,
  getPeople,
  getPeoples,
  getPodcast,
  getPodcasts,
  getShow,
  getShows,
  getVenue,
  getVenues,
} from '~lib/cms-api'
import { getNotionLink } from '~lib/notion/helpers'
import { readFile, writeFileSyncRecursive } from '~lib/notion/helpers/fs-helpers'
import getTimestamp from '~utils/getTimestamp'

// @todo(types)
// import { Blog, BlogItem } from '~lib/types'

const isDebug = false
/**
 * @todo Make this a `process.env.CACHE` variable YIKES DOES NOT WORK LIVE
 */
// const useCache = process.env.NODE_ENV === 'production'
const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const getPathVariables = (catchAll) => {
  let isIndex = false,
    isPage = false,
    relativeUrl = null,
    routeType = null,
    slug = null,
    url = null

  if (!!catchAll) {
    isDebug && console.dir(`!!catchAll`)
    isDebug && console.dir(catchAll)
    isPage = isPages(catchAll[0])
    relativeUrl = _join(catchAll, '/')
    routeType = isPage ? 'pages' : catchAll[0]
    isIndex = !catchAll[1]
    slug = (!isIndex || isPage) && _last(catchAll)
    url = relativeUrl
  }

  isDebug && console.dir(`> isIndex: ${isIndex}`)
  isDebug && console.dir(`> isPage: ${isPage}`)
  isDebug && console.dir(`> routeType: ${routeType}`)
  isDebug && console.dir(`> slug: ${slug}`)
  isDebug && console.dir(`> url: ${url}`)

  return {
    isIndex,
    isPage,
    relativeUrl,
    routeType,
    slug,
    url,
  }
}

// @todo(types)
// const getStaticPropsCatchAll: GetStaticProps<any> = async ({
const getStaticPropsCatchAll = async ({ preview, ...props }) => {
  isDebug && console.dir(`_ getStaticProps`)
  isDebug && console.dir(`preview: ${preview}`)
  isDebug && console.dir(props)

  const { catchAll } = props.params
  const { routeType, slug, url } = getPathVariables(catchAll)

  isDebug && console.dir(`routeType: ${routeType}`)

  isDebug && console.dir(` *** cache ***`)
  let cacheData, data
  const cacheFile = path.join(
    process.cwd(),
    '.cache',
    process.env.NEXT_PUBLIC__SITE,
    `${url === '/' ? 'index' : url}.json`
  )
  isDebug && console.dir(`> cacheFile: ${cacheFile}`)

  if (useCache) {
    try {
      cacheData = JSON.parse(await readFile(cacheFile, 'utf8'))
      data = cacheData
      isDebug && console.dir(`> readFile: ${cacheFile}`)
      // isDebug && console.dir(`> data:`)
      // isDebug && console.dir(data)
      // // @todo(cache) Cheat here since we technically have the data
      // from getPathVariables
      // if (isIndex) {
      //   _map(data.items, (item) => {
      //     const cacheFileItem = path.join(
      //       process.cwd(),
      //       '.cache',
      //       process.env.NEXT_PUBLIC__SITE,
      //       `${routeType}/${item.Slug}.json`
      //     )
      //     isDebug && console.dir(`> cacheFileItem: ${cacheFileItem}`)
      //     writeFileSyncRecursive(cacheFile, JSON.stringify(data), 'utf8')
      //   })
      // }
    } catch (_) {
      isDebug && console.dir(`> cacheFile: not found`)
      /* not fatal */
    }
  }

  if (!data) {
    switch (routeType) {
      case 'blog':
        data = slug ? await getBlog(catchAll) : await getBlogs()
        break
      // case 'episodes':
      //   data = slug ? await getEpisode(catchAll) : await getEpisodes()
      //   break
      case 'events':
        data = slug ? await getEvent(catchAll) : await getEvents()
        break
      case 'pages':
        // data = slug ? await getPage(catchAll):await getPages()
        data = await getPage(catchAll)
        break
      case 'people':
        data = slug ? await getPeople(catchAll) : await getPeoples()
        break
      case 'podcasts':
        data = slug ? await getPodcast(catchAll) : await getPodcasts()
        break
      case 'shows':
        data = slug ? await getShow(catchAll) : await getShows()
        isDebug && console.dir(data)
        break
      case 'venues':
        data = slug ? await getVenue(catchAll) : await getVenues()
        break
      default:
        isDebug && console.dir(`routeType: null`)
        break
    }
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  // @note(cache) Don't write file if no data
  if (useCache && !cacheData) {
    isDebug && console.dir(`> gS: writeFileSyncRecursive: ${cacheFile}`)
    writeFileSyncRecursive(cacheFile, JSON.stringify(data), 'utf8')
  }

  const returnData = {
    props: {
      ...data,
      preview,
    },
    revalidate: 60,
  }

  isDebug && console.dir(`> returnData`)
  // isDebug && console.dir(returnData)

  return returnData
}

const getStaticPathsWithDate = ({ data, routeType }) => {
  const years = []
  const months = []
  const dates = []

  // @refactor(filter) only published
  // @todo(types)
  const paths = _map(data, (item) => {
    const { year, month, date } =
      item['Date']?.event || getTimestamp(item['Date']?.start_date).event
    const notionLink = getNotionLink({
      slug: item.Slug,
      routeType,
      itemDate: { year, month, date },
    })

    return notionLink
  })

  /**
   * @todo This is ... not great, haha.
   * Go through each event to create index for YEAR, MONTH, DATE...
   */
  const yearsUnique = _uniqWith(years, _isEqual)
  yearsUnique.map((itemDate) => paths.push(`/${routeType}/${itemDate.year}`))
  const monthsUnique = _uniqWith(months, _isEqual)
  monthsUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}`)
  )
  const datesUnique = _uniqWith(dates, _isEqual)
  datesUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}/${itemDate.date}`)
  )

  return {
    fallback: true,
    paths,
  }
}

const getStaticPathsDefault = ({ data, routeType }) => {
  isDebug && console.dir(`> getStaticPathsDefault`)
  isDebug && console.dir(`routeType: ${routeType}`)
  // console.dir(data)
  // @refactor(filter) only published
  const paths = _map(data, (item: any) => {
    return getNotionLink({ slug: item.Slug, routeType })
  })

  return {
    fallback: true,
    paths,
  }
}

const getStaticPathsPodcastsEpisodes = ({ data, routeType }) => {
  // @refactor(filter) only published
  const paths = _map(data, (item: any) => {
    if (routeType === 'episodes') {
      // isDebug && console.dir(item)
      return getNotionLink({
        // @todo This breaks if more than one tag...
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        slug: item.Tags + '/' + item.Slug,
        routeType: 'podcasts',
      })
    } else {
      return getNotionLink({
        slug: item.Slug,
        routeType,
      })
    }
  })

  return {
    fallback: true,
    paths,
  }
}

// @todo(types)
// const getStaticPathsCatchAll: GetStaticPaths = async (_ctx) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStaticPathsCatchAll = async (_ctx) => {
  isDebug && console.dir(`_ getStaticPaths`)

  // @todo(types)
  const blogData: any = await getBlogs()
  // const episodesData: any = await getEpisodes()
  const eventsData: any = await getEvents()
  // const pagesData: any = await getPages()
  const peoplesData: any = await getPeoples()
  const podcastsData: any = await getPodcasts()
  const showsData: any = await getShows()
  const venuesData: any = await getVenues()

  const paths = []

  const { paths: blogPaths } = getStaticPathsWithDate({
    data: blogData.items,
    routeType: 'blog',
  })
  blogPaths && paths.push(...blogPaths)

  // const { paths: episodesPaths } = await getStaticPathsWithDate({
  //   data: episodesData.items,
  //   routeType: 'episodes',
  // })
  // episodesPaths && paths.push(...episodesPaths)

  const { paths: eventsPaths } = getStaticPathsWithDate({
    data: eventsData.items,
    routeType: 'events',
  })
  eventsPaths && paths.push(...eventsPaths)

  // const { paths: pagesPaths } = await getStaticPathsDefault({
  //   data: pagesData,
  //   routeType: 'pages',
  // })
  // pagesPaths && paths.push(...pagesPaths)
  /**
   * @refactor This should pull from RouteTypes
   *           for Listings and customizations not hard-coded
   */
  paths.push(
    '/blog',
    '/colophon',
    '/episodes',
    // '/events',
    '/people',
    '/podcasts',
    '/shows',
    '/users',
    '/venues'
  )

  const { paths: peoplesPaths } = getStaticPathsDefault({
    data: peoplesData.items,
    routeType: 'people',
  })
  peoplesPaths && paths.push(...peoplesPaths)

  const { paths: podcastsPath } = getStaticPathsPodcastsEpisodes({
    data: podcastsData.items,
    routeType: 'podcasts',
  })
  podcastsPath && paths.push(...podcastsPath)

  const { paths: showsPath } = getStaticPathsDefault({
    data: showsData.items,
    routeType: 'shows',
  })
  showsPath && paths.push(...showsPath)

  const { paths: venuesPath } = getStaticPathsDefault({
    data: venuesData.items,
    routeType: 'venues',
  })
  venuesPath && paths.push(...venuesPath)

  isDebug && console.dir(`paths`)
  isDebug && console.dir(paths)

  return {
    paths,
    fallback: true,
  }
}

export { getPathVariables, getStaticPathsCatchAll, getStaticPropsCatchAll }
