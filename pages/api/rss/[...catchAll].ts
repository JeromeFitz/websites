/**
 * @note This is ONLY for Podcast RSS for now
 *
 * Down the line perhaps this could be the API to the API, haha
 *
 */
import _isBefore from 'date-fns/isBefore'
import _parseISO from 'date-fns/parseISO'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _slice from 'lodash/slice'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Podcast, Item, FeedOptions } from 'podcast'

import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import getTimeInSeconds from '~utils/getTimeInSeconds'
import { ROUTE_TYPES } from '~utils/notion/helper'
import setCharAt from '~utils/setCharAt'

const url = `https://jeromefitzgerald.com`

const rssApi = async (req: NextApiRequest, res: NextApiResponse) => {
  let feed: any
  const timestampNow = new Date()
  const year: string = timestampNow.getFullYear().toString()

  // @todo(next) preview
  const preview = req.query?.preview || false
  const clear = req.query?.clear || false
  const catchAll = req.query?.catchAll

  if (catchAll[0] === 'true') return res.status(200).json({})
  /**
   * @cache
   */
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
  const cache = false

  // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
  const pathVariables = getPathVariables(catchAll)
  const data = await getCatchAll({
    cache,
    clear,
    catchAll,
    pathVariables,
    preview,
    retrieveImages: false,
  })

  /**
   * @note
   * 1. Get the Podcast Information
   * 2. Get the Podcast Episodes Information
   */
  const { routeType, slug } = pathVariables
  if (routeType === ROUTE_TYPES.podcasts && slug) {
    // const _id = routeTypeData.props.item.id
    // const podcast = routeTypeData.props.item
    const { info, items: _items } = data

    /**
     * @podcast
     */
    const {
      categories: _categories,
      explicit,
      podcastAuthor: author,
      podcastAuthorEmail: email,
      seoDescription: description,
      seoImage: imageUrl,
      title,
      type,
    } = info?.data
    const categories = _map(_categories, (c) => c.name)
    const feedUrl = `${url}/api/rss/${routeType}/${slug}`
    const itunesType = _map(type, (t) => t.name)[0]
    const podcastUrl = `${url}/${routeType}/${slug}`

    const feedOptions: FeedOptions = {
      title,
      description,
      generator: 'https://jeromefitzgerald.com',
      feedUrl,
      siteUrl: podcastUrl,
      imageUrl,
      docs: url,
      author,
      // managingEditor: author,
      // webMaster: author,
      copyright: `${year} ${author}`,
      language: 'en-US', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      // categories,
      // @note(rss) this is set by latest item
      // pubDate: pubDate,
      // ttl: 60, // @int Number of minutes feed can be cached before refreshing from source
      itunesAuthor: author,
      itunesSubtitle: description,
      itunesSummary: description,
      itunesOwner: {
        name: author,
        email,
      },
      itunesExplicit: explicit,
      itunesCategory: [{ text: 'Comedy' }],
      itunesImage: imageUrl,
      itunesType,
      customNamespaces: {
        // atom: 'http://www.w3.org/2005/Atom',
        // dc: 'http://purl.org/rss/1.0/modules/content',
        // // media: 'http://search.yahoo.com/mrss',
        // // // media: 'http://www.rssboard.org/media-rss',
        // podcast: 'https://podcastindex.org/namespace/1.0',
        // psc: 'https://podlove.org/simple-chapters/',
        googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
      },
      customElements: [
        {
          // <atom:link rel="self" type="application/rss+xml" href="https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/796f42bb-282c-4ba4-a0c6-a9ea0129cafa/fa8e724d-0571-49bb-841b-a9ea0129cb03/podcast.rss"/>
          // 'atom:link': {
          //   _attr: {
          //     rel: 'self',
          //     href: feedUrl,
          //     type: 'application/rss+xml',
          //   },
          // },
          image: [{ url: imageUrl }, { title }, { link: podcastUrl }],
        },
      ],
    }

    /**
     * @episodes
     */
    // @todo(rss) published
    // @todo(rss) reverse sort on published
    const items = _orderBy(
      _filter(_items?.results, { data: { published: true } }),
      ['data.datePublished.start'],
      ['desc']
    )
    let i = 0
    const episodes = []
    _map(items, (item) => {
      const {
        datePublished: { start: datePublished },
        // dateRecorded: { start: dateRecorded },
        duration,
        episode: itunesEpisode,
        explicit: itunesExplicit,
        mp3,
        season: itunesSeason,
        seoDescription: description,
        seoImage: itunesImage,
        slug,
        title,
        type,
      } = item?.properties

      const isAvailable = _isBefore(_parseISO(datePublished), timestampNow)
      // @todo(rss) handle this in filter above
      if (!isAvailable) return
      /**
       * @note
       * "latest" item to update (latest) pubDate
       */
      if (i === 0 && feedOptions) {
        feedOptions.pubDate = datePublished
      }
      i++

      const episodeUrl = `${podcastUrl}/${slug}`
      const itunesDuration = getTimeInSeconds(duration)
      const itunesEpisodeType = _map(type, (t) => t.name.toLowerCase())[0]
      const episode: Item = {
        title,
        description,
        url: episodeUrl,
        // @todo(podcast) uh-oh real question here!
        guid: episodeUrl,
        categories,
        author,
        date: datePublished,
        // lat: 1,
        // long: 2,
        // @note(rss) see customElements
        // enclosure: {
        //   url: '',
        //   file: '',
        //   size: 1,
        //   type: '',
        // },
        content: description,
        itunesAuthor: author,
        itunesExplicit,
        itunesSubtitle: description,
        itunesSummary: description,
        itunesDuration,
        itunesImage,
        itunesSeason,
        itunesEpisode,
        itunesTitle: title,
        itunesEpisodeType,
        itunesNewFeedUrl: null,
        // customNamespaces: [],
        customElements: [
          {
            enclosure: {
              _attr: {
                url: `${mp3}?utm_source=Podcast`,
                length: itunesDuration,
                type: 'audio/mpeg',
              },
              'media:content': {
                url: `${mp3}?utm_source=Podcast`,
                type: 'audio/mpeg',
              },
            },
          },
          { 'itunes:duration': itunesDuration },
        ],
      }
      // feed.addItem(episode)
      episodes.push(episode)
      return
    })

    feed = new Podcast(feedOptions)
    _map(episodes, (e) => feed.addItem(e))
  }

  if (feed) {
    res.status(200)
    res.setHeader('Content-Type', 'text/xml')
    const _xml = feed.buildXml({ indent: '  ' })
    /**
     * @hack
     * lastBuildDate, is set by node-rss
     * ref: https://github.com/maxnowack/node-podcast/issues/16#issuecomment-363369279
     *
     * This should be the same as `pubDate` not a timestamp
     */
    let xml = _xml
    const dateExample = 'Thu, 06 Feb 2020 13:00:00 GMT'
    const lbdTerm = '<lastBuildDate>'
    const lbd: number = _xml.indexOf(lbdTerm)
    const lbdElement = lbd + lbdTerm.length
    // const _lastBuildDate = _slice(_xml, lbdElement, lbdElement + dateExample.length)
    const pbdTerm = '<pubDate>'
    const pbd: number = _xml.indexOf(pbdTerm)
    const pbdElement = pbd + pbdTerm.length
    const _pubDate = _slice(_xml, pbdElement, pbdElement + dateExample.length)
    _map(_pubDate, (c: string, i: number) => {
      xml = setCharAt(xml, lbdElement + i, c)
    })
    res.send(xml)
    // res.status(200).json(json.props)
  } else {
    res.status(404).json({ status: 404, data })
  }
  return true
}

export default rssApi
