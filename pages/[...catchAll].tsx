import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { isPages } from '~config/notion/website'
// import _concat from 'lodash/concat'
// import _find from 'lodash/find'
import _isEqual from 'lodash/isEqual'
import _capitalize from 'lodash/capitalize'
import _join from 'lodash/join'
import _map from 'lodash/map'
// import _merge from 'lodash/merge'
import _uniqWith from 'lodash/uniqWith'
import getTimestamp from '~utils/getTimestamp'
import { getNotionLink } from '~lib/notion/helpers'
// import getCollectionView from '~config/notion/schema/getCollectionView'
// import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'
import {
  getBlog,
  getBlogs,
  getEvent,
  getEvents,
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

export default function CatchAll({ ...rest }: any) {
  const url = 'https://jeromefitzgerald.com'
  let title = 'B1'
  let description = 'B1 Placeholder'

  const items = rest.data
  const key = items && Object.keys(items)
  const isSingle = key && key.length === 1
  const item = isSingle && items[key[0]]

  title = isSingle ? item.Title : _capitalize(rest.routeType)
  description = isSingle ? item['SEO.Description'] : `Description: ${title}`

  const header = {
    description,
    title,
  }

  isDebug && console.dir(`> items`)
  isDebug && console.dir(items)

  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Header {...header} />
      {!isSingle && items && <Listing items={items} {...rest} />}
      {isSingle && item && <div id="content">{renderNotionContent(item)}</div>}
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
      ...rest,
      data,
      preview,
      relativeUrl: _join(rest.params.catchAll, '/'),
      routeType,
    },
    revalidate: 60,
  }
}

const getStaticPathsDefault = async ({ data, routeType }) => {
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
  const peoplesData: any = await getPeoples()
  const podcastsData: any = await getPodcasts()
  const showsData: any = await getShows()
  const venuesData: any = await getVenues()

  const paths = []

  const { paths: blogPaths } = await getStaticPathsWithDate({
    data: blogData,
    routeType: 'blog',
  })
  blogPaths && paths.push(...blogPaths)

  const { paths: eventsPaths } = await getStaticPathsWithDate({
    data: eventsData,
    routeType: 'events',
  })
  eventsPaths && paths.push(...eventsPaths)

  const { paths: peoplesPaths } = await getStaticPathsDefault({
    data: peoplesData,
    routeType: 'peoples',
  })
  peoplesPaths && paths.push(...peoplesPaths)

  const { paths: podcastsPath } = await getStaticPathsPodcastsEpisodes({
    data: podcastsData,
    routeType: 'podcasts',
  })
  podcastsPath && paths.push(...podcastsPath)

  const { paths: showsPath } = await getStaticPathsDefault({
    data: showsData,
    routeType: 'shows',
  })
  showsPath && paths.push(...showsPath)

  const { paths: venuesPath } = await getStaticPathsDefault({
    data: venuesData,
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
