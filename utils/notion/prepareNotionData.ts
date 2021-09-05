import path from 'path'

import _first from 'lodash/first'
import _join from 'lodash/join'
import _last from 'lodash/last'

// import { isPages } from '~config/notion/website'
const routeTypesArray = [
  'blog',
  'episodes',
  'events',
  'pages',
  'people',
  'podcasts',
  'seo',
  'shows',
  'users',
  'venues',
]

/**
 * @todo fix anti-pattern, this is confusing
 */
const isPages = (routeType) => {
  const isPage = routeTypesArray.indexOf(routeType) > -1
  return !isPage
}

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const getPathVariables = (catchAll) => {
  let isIndex = false,
    isPage = false,
    relativeUrl = null,
    routeType = null,
    slug = null,
    url = null

  if (!!catchAll) {
    // console.dir(catchAll)
    isPage = isPages(catchAll[0])
    relativeUrl = isPage && catchAll[0] === 'homepage' ? '/' : _join(catchAll, '/')
    routeType = isPage ? 'pages' : _first(catchAll)
    slug = (!isIndex || isPage) && _last(catchAll)
    isIndex = !catchAll[1] || parseInt(slug) > 0
    url = relativeUrl
  }
  // console.dir(!catchAll[1] || parseInt(slug) > 0)

  return {
    isIndex,
    isPage,
    relativeUrl,
    routeType,
    slug,
    url,
  }
}

const getStaticPathsCatchAll = () => {
  // console.dir(`_ getStaticPaths`)

  // // @todo(types)
  // const blogData: any = await getBlogs()
  // // const episodesData: any = await getEpisodes()
  // const eventsData: any = await getEvents()
  // // const pagesData: any = await getPages()
  // const peoplesData: any = await getPeoples()
  // const podcastsData: any = await getPodcasts()
  // const showsData: any = await getShows()
  // const venuesData: any = await getVenues()

  const paths = []

  // const { paths: blogPaths } = await getStaticPathsWithDate({
  //   data: blogData.items,
  //   routeType: 'blog',
  // })
  // blogPaths && paths.push(...blogPaths)

  // // const { paths: episodesPaths } = await getStaticPathsWithDate({
  // //   data: episodesData.items,
  // //   routeType: 'episodes',
  // // })
  // // episodesPaths && paths.push(...episodesPaths)

  // const { paths: eventsPaths } = await getStaticPathsWithDate({
  //   data: eventsData.items,
  //   routeType: 'events',
  // })
  // eventsPaths && paths.push(...eventsPaths)

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
    // '/episodes',
    '/events',
    // '/events/2020',
    // '/events/2020/05',
    // '/events/2020/05/01',
    // '/events/2020/05/01/jerome-and',
    // '/events/2020/05/08',
    // '/events/2020/05/08/jerome-and',
    // '/events/2020/05/22',
    // '/events/2020/05/22/jerome-and',
    // '/people',
    '/podcasts',
    '/shows'
    // '/shows/jfle',
    // '/shows/alex-o-jerome',
    // '/users',
    // '/venues'
  )

  // const { paths: peoplesPaths } = await getStaticPathsDefault({
  //   data: peoplesData.items,
  //   routeType: 'people',
  // })
  // peoplesPaths && paths.push(...peoplesPaths)

  // const { paths: podcastsPath } = await getStaticPathsPodcastsEpisodes({
  //   data: podcastsData.items,
  //   routeType: 'podcasts',
  // })
  // podcastsPath && paths.push(...podcastsPath)

  // const { paths: showsPath } = await getStaticPathsDefault({
  //   data: showsData.items,
  //   routeType: 'shows',
  // })
  // showsPath && paths.push(...showsPath)

  // const { paths: venuesPath } = await getStaticPathsDefault({
  //   data: venuesData.items,
  //   routeType: 'venues',
  // })
  // venuesPath && paths.push(...venuesPath)

  // console.dir(`paths`)
  // console.dir(paths)

  return {
    paths,
    fallback: true,
  }
}

const getStaticPropsCatchAll = ({ preview, ...props }) => {
  // console.dir(`_ getStaticProps`)
  // console.dir(`preview: ${preview}`)
  // console.dir(props)

  const { catchAll } = props.params
  const { routeType, slug, url } = getPathVariables(catchAll)

  // console.dir(`routeType: ${routeType}`)

  // console.dir(` *** cache ***`)

  let cacheData, data

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cacheFile = path.join(
    process.cwd(),
    '.cache',
    process.env.NEXT_PUBLIC__SITE,
    `${url === '/' ? 'index' : url}.json`
  )
  // console.dir(`> cacheFile: ${cacheFile}`)

  if (!data) {
    switch (routeType) {
      case 'blog':
        // data = slug ? await getBlog(catchAll) : await getBlogs()
        break
      case 'events':
        // data = slug ? await getEvent(catchAll) : await getEvents()
        data = slug ? { get: 'event' } : { get: 'events' }
        break
      case 'pages':
        // // data = slug ? await getPage(catchAll):await getPages()
        // data = await getPage(catchAll)
        break
      case 'people':
        // data = slug ? await getPeople(catchAll) : await getPeoples()
        break
      case 'podcasts':
        // data = slug ? await getPodcast(catchAll) : await getPodcasts()
        break
      case 'shows':
        // data = slug ? await getShow(catchAll) : await getShows()
        data = slug ? { get: 'show' } : { get: 'shows' }
        break
      case 'venues':
        // data = slug ? await getVenue(catchAll) : await getVenues()
        break
      default:
        // console.dir(`routeType: null`)
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
    // console.dir(`> gS: writeFileSyncRecursive: ${cacheFile}`)
    // writeFileSyncRecursive(cacheFile, JSON.stringify(data), 'utf8')
  }

  const returnData = {
    props: {
      ...data,
      preview,
    },
    revalidate: 60,
  }

  // console.dir(`> returnData`)
  // console.dir(returnData)

  return returnData
}

export { getPathVariables, getStaticPathsCatchAll, getStaticPropsCatchAll }
