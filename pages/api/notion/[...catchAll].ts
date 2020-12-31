import ms from 'ms'
import { NextApiRequest, NextApiResponse } from 'next'
import _find from 'lodash/find'
import _join from 'lodash/join'
import _last from 'lodash/last'
import { isPages } from '~config/notion/website'
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
import getRouteTypeSeo from '~lib/notion/utils/getRouteTypeSeo'

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 5

export default async function getNotionApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const preview = req.query?.preview || false
    const display = req.query?.display || false
    const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    // http://localhost:3000/api/notion/blog/my-third-post?preview=true&display=true
    const isPage = isPages(catchAll[0])
    const routeType = isPage ? 'pages' : catchAll[0]
    const isIndex = !catchAll[1]
    // @todo(notion) getSlug: nuance between Blog|Events and others
    const slug = !isIndex && _last(catchAll)

    let data
    switch (routeType) {
      case 'blog':
        data = !!slug ? await getBlog(catchAll) : await getBlogs()
        break
      case 'events':
        data = !!slug ? await getEvent(catchAll) : await getEvents()
        break
      case 'pages':
        // data = !!slug ? await getPage(catchAll) : await getPages()
        data = await getPage(catchAll)
        break
      case 'people':
        data = !!slug ? await getPeople(catchAll) : await getPeoples()
        break
      case 'podcasts':
        data = !!slug ? await getPodcast(catchAll) : await getPodcasts()
        break
      case 'shows':
        data = !!slug ? await getShow(catchAll) : await getShows()
        break
      case 'venues':
        data = !!slug ? await getVenue(catchAll) : await getVenues()
        break

      default:
        data = null
        break
    }

    const relativeUrl = _join(catchAll, '/')
    const urlBase = 'https://jeromefitzgerald.com/'
    let noindex = false
    let title: string, description: string, openGraph: any
    let url: string = urlBase

    //
    url += relativeUrl
    noindex = false

    const isItems = isIndex && !slug
    const items = isItems ? data : null
    const item = !isItems ? _find(data, { Slug: slug }) : null

    let routeTypeSeo: any = null
    if (items) {
      // @todo(notion) Blog, Event ... Date Listing SEO Defaults
      routeTypeSeo = await getRouteTypeSeo(routeType)
      title = routeTypeSeo['Title']
      description = routeTypeSeo['SEO.Description']
      noindex = routeTypeSeo.NoIndex || false
      openGraph = routeTypeSeo && {
        url,
        title,
        description,
        images:
          routeTypeSeo && routeTypeSeo['SEO.Image']
            ? [
                {
                  alt: routeTypeSeo['SEO.Image.Description'] || description,
                  url: routeTypeSeo['SEO.Image'],
                },
              ]
            : null,
      }
    } else {
      title = item['Title']
      description = item['SEO.Description']
      noindex = item.NoIndex || false
      openGraph = item && {
        url,
        title,
        description,
        images:
          item && item['SEO.Image']
            ? [
                {
                  alt: item['SEO.Image.Description'] || description,
                  url: item['SEO.Image'],
                },
              ]
            : null,
      }
    }

    const seo = {
      canonical: url,
      description,
      noindex,
      openGraph,
      title,
    }

    // Set caching headers
    // @refactor(cache) Every Route Probably Does Not Need This Treatment (catchAll)

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`))
    res.setHeader('Expires', expires.toUTCString())
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    )

    if (clear) {
      const location = isPage ? '/' : `/${routeType}`
      res.clearPreviewData()
      res.writeHead(307, { Location: location })
      res.end()
    }

    const json = {
      props: {
        data,
        // catchAll,
        // routeType,
        // routeTypeSeo,
        seo,
      },
      preview,
    }

    if (json?.props) {
      if (preview && display) {
        res.setPreviewData({})
        res.writeHead(307, {
          Location: `/${routeType}/${slug}`,
        })
        res.end()
      } else {
        res.status(200).json(json.props)
        // return res.status(200).json(data)
      }
    } else {
      res.status(404).json({
        status: 404,
      })
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}
