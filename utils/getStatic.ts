// import { GetStaticProps, GetStaticPaths } from 'next'
import { isPages } from '~config/notion/website'
import _isEqual from 'lodash/isEqual'
import _last from 'lodash/last'
import _map from 'lodash/map'
import _uniqWith from 'lodash/uniqWith'

import getTimestamp from '~utils/getTimestamp'
import { getNotionLink } from '~lib/notion/helpers'
import {
  getBlog,
  getBlogs,
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

// @todo(types)
// import { Blog, BlogItem } from '~lib/types'

const isDebug = false

const getPathVariables = (catchAll) => {
  let isIndex = false,
    isPage = false,
    routeType = null,
    slug = null

  if (!!catchAll) {
    isPage = isPages(catchAll[0])
    routeType = isPage ? 'pages' : catchAll[0]
    isIndex = !catchAll[1]
    slug = (!isIndex || isPage) && _last(catchAll)
  }

  isDebug && console.dir(`> isIndex: ${isIndex}`)
  isDebug && console.dir(`> isPage: ${isPage}`)
  isDebug && console.dir(`> routeType: ${routeType}`)
  isDebug && console.dir(`> slug: ${slug}`)

  return {
    isIndex,
    isPage,
    routeType,
    slug,
  }
}

// @todo(types)
// const getStaticPropsCatchAll: GetStaticProps<any> = async ({
const getStaticPropsCatchAll = async ({ preview, ...props }) => {
  isDebug && console.dir(`_ getStaticProps`)
  isDebug && console.dir(props)

  // @note(typess) Fix this ignore please.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { catchAll } = props.params
  const { routeType, slug } = getPathVariables(catchAll)

  isDebug && console.dir(`routeType: ${routeType}`)

  let data
  switch (routeType) {
    case 'blog':
      data = slug ? await getBlog(catchAll) : await getBlogs()
      break
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
      break
    case 'venues':
      data = slug ? await getVenue(catchAll) : await getVenues()
      break
    default:
      isDebug && console.dir(`routeType: null`)
      break
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...data,
      preview,
    },
    revalidate: 60,
  }
}

const getStaticPathsWithDate = async ({ data, routeType }) => {
  const years = []
  const months = []
  const dates = []

  // @refactor(filter) only published
  // @todo(types)
  const paths = await _map(data, (item) => {
    const { year, month, date } = getTimestamp(item['Date']?.start_date).event
    return getNotionLink({
      slug: item.Slug,
      routeType,
      itemDate: { year, month, date },
    })
  })

  /**
   * @todo This is ... not great, haha.
   * Go through each event to create index for YEAR, MONTH, DATE...
   */
  const yearsUnique = await _uniqWith(years, _isEqual)
  yearsUnique.map((itemDate) => paths.push(`/${routeType}/${itemDate.year}`))
  const monthsUnique = await _uniqWith(months, _isEqual)
  monthsUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}`)
  )
  const datesUnique = await _uniqWith(dates, _isEqual)
  datesUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}/${itemDate.date}`)
  )

  return {
    fallback: true,
    paths,
  }
}

const getStaticPathsDefault = async ({ data, routeType }) => {
  isDebug && console.dir(`> getStaticPathsDefault`)
  isDebug && console.dir(`routeType: ${routeType}`)
  // console.dir(data)
  // @refactor(filter) only published
  const paths = await _map(data, (item: any) => {
    return getNotionLink({ slug: item.Slug, routeType })
  })

  return {
    fallback: true,
    paths,
  }
}

const getStaticPathsPodcastsEpisodes = async ({ data, routeType }) => {
  // @refactor(filter) only published
  const paths = await _map(data, (item: any) => {
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
  const eventsData: any = await getEvents()
  // const pagesData: any = await getPages()
  const peoplesData: any = await getPeoples()
  const podcastsData: any = await getPodcasts()
  const showsData: any = await getShows()
  const venuesData: any = await getVenues()

  const paths = []

  const { paths: blogPaths } = await getStaticPathsWithDate({
    data: blogData.items,
    routeType: 'blog',
  })
  blogPaths && paths.push(...blogPaths)

  const { paths: eventsPaths } = await getStaticPathsWithDate({
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
    '/events',
    '/people',
    '/podcasts',
    '/shows',
    '/users',
    '/venues'
  )

  const { paths: peoplesPaths } = await getStaticPathsDefault({
    data: peoplesData.items,
    routeType: 'people',
  })
  peoplesPaths && paths.push(...peoplesPaths)

  const { paths: podcastsPath } = await getStaticPathsPodcastsEpisodes({
    data: podcastsData.items,
    routeType: 'podcasts',
  })
  podcastsPath && paths.push(...podcastsPath)

  const { paths: showsPath } = await getStaticPathsDefault({
    data: showsData.items,
    routeType: 'shows',
  })
  showsPath && paths.push(...showsPath)

  const { paths: venuesPath } = await getStaticPathsDefault({
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
