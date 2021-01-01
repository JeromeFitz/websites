import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { isPages } from '~config/notion/website'
import _isEqual from 'lodash/isEqual'
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
import { Blog, BlogItem } from '~lib/types'

import Container from '~components/Container'
import Header from '~components/Header'
import { Listing } from '~components/Listing'

import renderNotionContent from '~lib/notion/helpers/renderNotionContent'

const isDebug = false

// type Props = {
//   catchAll: any
//   blog: Blog
//   preview: boolean
// }

export default function CatchAll({ item, items, seo, ...rest }: any) {
  const isIndex = !!items

  const header = {
    description: seo.description || '',
    title: seo.title || '',
  }

  isDebug && console.dir(`> rest`)
  isDebug && console.dir(rest)

  return (
    <Container>
      <NextSeo {...seo} />
      <Header {...header} />
      {isIndex && items && <Listing items={items} {...rest} />}
      {!isIndex && item && <div id="content">{renderNotionContent(item)}</div>}
    </Container>
  )
}

// type StaticProps = {
//   params: { catchAll: any }
//   preview?: boolean
// }

// @refactor(notion) This only works with Single Return Things not Listings...
export const getStaticProps: GetStaticProps<any> = async ({
  preview = false,
  ...rest
}) => {
  isDebug && console.dir(`_ getStaticProps`)
  isDebug && console.dir(rest)

  const isPage = isPages(rest.params.catchAll[0])
  const routeType = isPage ? 'pages' : rest.params.catchAll[0]
  const isIndex = !rest.params.catchAll[1]

  isDebug && console.dir(`routeType: ${routeType}`)

  let data
  switch (routeType) {
    case 'blog':
      data = isIndex ? await getBlogs() : await getBlog(rest.params.catchAll)
      break
    case 'events':
      data = isIndex ? await getEvents() : await getEvent(rest.params.catchAll)
      break
    case 'pages':
      // data = isIndex ? await getPages() : await getPage(rest.params.catchAll)
      data = await getPage(rest.params.catchAll)
      break
    case 'people':
      data = isIndex ? await getPeoples() : await getPeople(rest.params.catchAll)
      break
    case 'podcasts':
      data = isIndex ? await getPodcasts() : await getPodcast(rest.params.catchAll)
      break
    case 'shows':
      data = isIndex ? await getShows() : await getShow(rest.params.catchAll)
      break
    case 'venues':
      data = isIndex ? await getVenues() : await getVenue(rest.params.catchAll)
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

const getStaticPathsWithDate = async ({ data, routeType }) => {
  const years = []
  const months = []
  const dates = []

  // @refactor(filter) only published
  const paths = await _map(data, (item: BlogItem) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  isDebug && console.dir(`_ getStaticPaths`)

  const blogData: Blog[] = await getBlogs()
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
