/**
 * @note This is ONLY for Podcast RSS for now
 *
 * Down the line perhaps this could be the API to the API, haha
 *
 */
import _isBefore from 'date-fns/isBefore'
import _parseISO from 'date-fns/parseISO'
import type { NextApiRequest, NextApiResponse } from 'next'
import Podcast from 'podcast'

import { getStaticPropsCatchAll } from 'zzz/utils/getStatic'

import { getNextSeo, isPages, routeTypes } from '../../config/notion/website'

import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'
import getTimeInSeconds from '~utils/getTimeInSeconds'
// import { getStaticProps } from '~utils/notion/getStaticNotion'

const isDebug = false

const today = new Date()
const url = getNextSeo.custom.url

const isTrue = (val) => (val === 'Yes' ? true : false)

const rssApi = async (req: NextApiRequest, res: NextApiResponse) => {
  let feed: any = null

  isDebug && console.dir(`api/rss/[...catchAll]].js`)
  isDebug && console.dir(`req.query`)
  isDebug && console.dir(req.query)
  isDebug && console.dir(`req.url: ${req.url}`)

  const catchAll = req.query.catchAll

  // http://localhost:3000/api/nq/blog/my-third-post?preview=true&display=true
  const isPage = isPages(catchAll[0])
  const routeType = isPage ? 'pages' : catchAll[0]
  const isIndex = !catchAll[1]
  const slug = !isIndex && catchAll[1]

  isDebug && console.dir(`catchAll`)
  isDebug && console.dir(catchAll)

  /**
   * @note
   * 1. Get the Podcast Information
   * 2. Get the Podcast Episodes Information
   */
  // @todo(types)
  const routeTypeData: any = await getStaticPropsCatchAll({
    episode: null,
    locale: 'en',
    locales: ['en'],
    params: { catchAll: [routeType, slug] },
    preview: false,
    routeType,
    slug,
    url: req.url,
    defaultLocale: 'en',
  })
  isDebug && console.dir(`routeTypeData: `)
  isDebug && console.dir(routeTypeData)

  if (routeType === 'podcasts' && slug) {
    // const _id = routeTypeData.props.item.id
    const podcast = routeTypeData.props.item

    /**
     * @refactor Heavily customized ... to already heavily customized
     */
    const {
      collectionId,
      collectionViewId__podcast: collectionViewId,
      indexId,
    } = routeTypes.episodes
    const podcastEpisodesData = await getStaticPropsQueryCollection({
      // collectionId: 'cd6f2e2f-3e1d-482b-9891-530501f1c797',
      // collectionViewId: 'c97aac1e-166e-4657-8cf2-8712f280505d',
      collectionId,
      collectionViewId,
      id: null,
      // indexId: 'f09fac69-3045-46cc-9209-44b13665bada',
      indexId,
      itemDate: null,
      preview: null,
      routeType: 'podcastEpisodes',
      slug,
      url: `episodes/${slug}`,
      // @note(vercel) cannot write live cache files after builds to vercel
      writeCacheFile: false,
    })
    isDebug && console.dir(`podcastEpisodesData: `)
    isDebug && console.dir(podcastEpisodesData)

    const items = podcastEpisodesData.props.data
    // isDebug && console.dir(`items: `)
    // isDebug && console.dir(items)

    const year = today.getFullYear()
    feed = new Podcast({
      title: podcast.Title,
      description: `${podcast['SEO.Description']}`,
      generator: 'ngop[odcast]',
      // feedUrl: `${url}/${routeType}/${slug}`,
      siteUrl: `${url}/${routeType}/${slug}`,
      // imageUrl: ``,
      docs: `${url}`,
      author: podcast['Author'],
      // managingEditor: podcast['Author'],
      // webMaster: podcast['Author'],
      copyright: `${year} ${podcast['Author']}`,
      // language: 'en-US', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      // categories: [podcast['Category']],
      // pubDate: pubDate,
      // ttl: 60, // @int Number of minutes feed can be cached before refreshing from source
      itunesAuthor: podcast['Author'],
      itunesSubtitle: podcast['Subtitle'],
      itunesSummary: `${podcast['SEO.Description']})`,
      itunesOwner: {
        name: podcast['Author'],
        email: podcast['Author.Email'],
      },
      itunesExplicit: isTrue(podcast['Explicit']),
      // { text: podcast['Category'], subcats: [{ text: 'String', subcats: [''] }] },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      itunesCategory: [{ text: podcast['Category'], subcats: {} }],
      itunesImage: podcast['SEO.Image'],
      itunesType: podcast['Type'],
      customNamespaces: {
        atom: 'http://www.w3.org/2005/Atom',
        media: 'http://search.yahoo.com/mrss',
        // media: 'http://www.rssboard.org/media-rss',
        psc: 'https://podlove.org/simple-chapters/',
      },
      customElements: [
        {
          // <atom:link rel="self" type="application/rss+xml" href="https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/796f42bb-282c-4ba4-a0c6-a9ea0129cafa/fa8e724d-0571-49bb-841b-a9ea0129cb03/podcast.rss"/>
          'atom:link': {
            _attr: {
              rel: 'self',
              href: `${url}/${routeType}/${slug}`,
              type: 'application/rss+xml',
            },
          },
          image: [
            { url: podcast['SEO.Image'] },
            { title: podcast.Title },
            { link: `${url}/${routeType}/${slug}` },
          ],
        },
        { language: 'en-US' },
      ],
    })

    /**
     * Episode Info
     */
    Object.values(items)
      // @todo(published)
      .filter((item: any) => item.Published === 'Yes')
      .filter((item: any) => item.Slug !== 'homepage')
      .sort((a, b) => a['Date.Published'] - b['Date.Published'])
      // .reverse()
      .map((episode: any, _episodeIndex: any) => {
        // isDebug && console.dir(`episode`)
        // isDebug && console.dir(episode)
        const duration = getTimeInSeconds(episode.Duration) // number in seconds
        /**
         * @note Dynamic Publishing
         */
        const timestamp = episode['Date.Published']
        const isAvailable = _isBefore(_parseISO(timestamp.utc), today)

        if (isAvailable) {
          /**
           * @note Update `pubDate`.
           */
          if (_episodeIndex === 0 && feed) {
            feed.feedOptions.pubDate = timestamp.iso
          }
          // isDebug && console.dir(episode)
          feed.addItem({
            title: episode.Title,
            description: episode['SEO.Description'],
            url: `${url}/${routeType}/${slug}/${episode.Slug}`,
            // @important GUID is Unique!
            guid: episode.id,
            categories: [podcast['Category']],
            author: podcast['Author'],
            date: timestamp.iso,
            // lat: 1,
            // long: 2,
            // enclosure: {
            //   url: '',
            //   file: '',
            //   size: 1,
            //   type: ''
            // },
            content: episode['SEO.Description'],
            itunesAuthor: podcast['Author'],
            itunesExplicit: isTrue(podcast['Explicit']),
            itunesSubtitle: episode['Subtitle'],
            itunesSummary: episode['SEO.Description'],
            // itunesDuration: duration, // Why does this not work...
            // itunesKeywords: ['Jer&Ky', 'JerKy', 'MailShrimp'],
            itunesImage: episode['SEO.Image'],
            itunesSeason: episode.Season,
            itunesEpisode: episode.Episode,
            itunesTitle: episode.Title,
            itunesEpisodeType: episode['Type'],
            // customNamespaces: [],
            // customElements: [{ 'itunes:subtitle': episode['Subtitle'] }],
            customElements: [
              {
                // 'content:encoded': `<![CDATA[ <b>test</b> ]]`,
                enclosure: {
                  _attr: {
                    url: `${episode['MP3']}?utm_source=Podcast`,
                    length: duration,
                    type: 'audio/mpeg',
                  },
                },
                'media:content': {
                  _attr: {
                    url: episode['MP3'],
                    type: 'audio/mpeg',
                  },
                },
              },
              { 'itunes:duration': duration },
            ],
          })
        }

        return true
      })
  }

  if (feed) {
    res.status(200)
    res.send(feed.buildXml())
    // res.status(200).json(json.props)
  } else {
    res.status(404).json({ status: 404 })
  }
  return true
}

export default rssApi
