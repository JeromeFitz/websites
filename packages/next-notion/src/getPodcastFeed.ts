import _isBefore from 'date-fns/isBefore'
import _parseISO from 'date-fns/parseISO'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import { Podcast, Item, FeedOptions } from 'podcast'

import { getTimeInSeconds } from './utils'
import { getXmlWithModifiedLastBuildDate } from './utils/getXmlWithModifiedLastBuildDate'

const getPodcastFeed = ({ data, notionConfig, pathVariables }) => {
  // @todo(multi-site)
  const url = `https://${process.env.NEXT_PUBLIC__SITE}`
  const { NOTION } = notionConfig
  /**
   * @note
   * 1. Get the Podcast Information
   * 2. Get the Podcast Episodes Information
   */
  let feed: any
  const timestampNow = new Date()
  const year: string = timestampNow.getFullYear().toString()

  const { routeType, slug } = pathVariables
  if (routeType === NOTION.PODCASTS.routeType && slug) {
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
      seoImage,
      title,
      type,
    } = info?.properties
    const categories = _map(_categories, (c) => c.name)
    const feedUrl = `${url}/api/rss/${routeType}/${slug}`
    const itunesCategory = [{ text: categories[0] }]
    const itunesType = _map(type, (t) => t.name)[0]
    const podcastUrl = `${url}/${routeType}/${slug}`
    const imageUrl = seoImage[Object.keys(seoImage)[0]]?.url

    const feedOptions: FeedOptions = {
      title,
      description,
      generator: url,
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
      itunesCategory,
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
      _filter(_items?.results, { properties: { isPublished: true } }),
      ['properties.datePublished.start'],
      ['desc']
    )
    let i = 0
    const episodes: any = []
    _map(items, (item) => {
      const {
        datePublished: { start: datePublished },
        // dateRecorded: { start: dateRecorded },
        duration,
        episode: itunesEpisode,
        explicit: itunesExplicit,
        mp3: _mp3,
        season: itunesSeason,
        seoDescription: description,
        seoImage,
        slug,
        title,
        type,
      } = item?.properties

      const isAvailable = _isBefore(_parseISO(datePublished), timestampNow)
      const itunesImage = seoImage[Object.keys(seoImage)[0]]?.url
      const mp3 = _mp3[Object.keys(_mp3)[0]]?.url
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
        /**
         * @todo(podcast) uh-oh real question here!
         * What if this needs to change due to URL or GUID on Notion ID side
         */
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
        itunesNewFeedUrl: undefined,
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
    const xmlOriginal = feed.buildXml({ indent: '  ' })
    return getXmlWithModifiedLastBuildDate({ xmlOriginal })
  } else {
    return undefined
  }
}

export { getPodcastFeed }
