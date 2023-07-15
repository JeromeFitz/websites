/* eslint-disable @typescript-eslint/ban-ts-comment */
// https://jerandky.com/api/rss/podcasts/jer-and-ky-and-guest
// https://jerandky.com/api/rss/podcasts/knockoffs

import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/src/notion/utils'
import _orderBy from 'lodash/orderBy'
import { NextRequest, NextResponse } from 'next/server'
import { notion } from 'next-notion/src/helper'
import { Podcast } from 'podcast'

// import type { PropertiesEpisode, PropertiesPodcast } from '~app/(notion)/_config'
import { CONFIG, getEpisodeData, getPodcastData } from '~app/(notion)/_config'

const { DATABASE_ID, SEGMENT } = CONFIG.PODCASTS

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  console.dir(`slug: ${slug}`)

  const segmentInfo = getSegmentInfo({ SEGMENT, params: { catchAll: [slug] } })
  console.dir(segmentInfo)

  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: false,
    filterType: 'equals',
    revalidate: false,
    segmentInfo,
  })
  const podcastData = getPodcastData(data?.page?.properties)
  // console.dir(props)

  // const episodes = await getDataFromCache({
  //   database_id: CONFIG.EPISODES.DATABASE_ID,
  //   draft: false,
  //   filterType: 'starts_with',
  //   revalidate: false,
  //   segmentInfo: {
  //     catchAll: ['podcasts', 'knockoffs'],
  //     isIndex: false,
  //     hasMeta: true,
  //     segment: 'episodes',
  //     segmentCount: 2,
  //     slug: '/podcasts/knockoffs',
  //   },
  // })
  const isDev = process.env.NODE_ENV === 'development'
  const isPublishedAnd = isDev
    ? {
        timestamp: 'created_time',
        created_time: {
          after: '2020-01-01T00:00:00.000Z',
        },
      }
    : {
        property: 'Is.Published',
        checkbox: {
          equals: true,
        },
      }
  const options = {
    database_id: CONFIG.EPISODES.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Slug.Preview',
          rich_text: {
            ['starts_with']: `/podcasts/${slug}`,
          },
        },
        isPublishedAnd,
      ],
    },
    sorts: [],
  }
  // @ts-ignore
  const dataEpisodes = await notion.databases.query(options)
  // console.dir(`dataEpisodes:`)
  // console.dir(dataEpisodes)
  const _episodes = dataEpisodes.results.map((episode) => {
    // @ts-ignore
    return getEpisodeData(episode.properties)
  })
  const episodes = _orderBy(_episodes, ['season', 'episode'], ['desc', 'desc'])
  // console.dir(episodes)

  let feed: any = null
  const today = new Date()
  const year = today.getFullYear()
  const url = `https://${process.env.NEXT_PUBLIC__SITE}`
  const siteUrl = `${url}${podcastData.href}`
  feed = new Podcast({
    title: podcastData.title,
    description: podcastData.seoDescription,
    generator: 'ngop[odcast]',
    // feedUrl: `${url}/${routeType}/${slug}`,
    siteUrl,
    // imageUrl: ``,
    docs: `${url}`,
    author: podcastData?.author,
    // managingEditor: podcast['Author'],
    // webMaster: podcast['Author'],
    copyright: `${year} ${podcastData?.author}`,
    // language: 'en-US', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    categories: podcastData.categories.map((category) => category.name),
    pubDate: episodes[0].dateIso,
    // ttl: 60, // @int Number of minutes feed can be cached before refreshing from source
    itunesAuthor: podcastData?.author,
    itunesSubtitle: podcastData?.subtitle,
    itunesSummary: podcastData?.seoDescription,
    itunesOwner: {
      name: podcastData?.author,
      email: podcastData?.authorEmail,
    },
    // itunesExplicit: podcastData.isExplicit,
    itunesCategory: podcastData.categories.map((category) => ({
      text: category.name,
      subcats: {},
    })),
    itunesImage: podcastData?.seoImage?.external?.url,
    itunesType: podcastData.type,
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
            href: siteUrl,
            type: 'application/rss+xml',
          },
        },
        image: [
          { url: podcastData?.seoImage?.external?.url },
          { title: podcastData?.title },
          { link: siteUrl },
        ],
      },
      { language: 'en-US' },
    ],
  })
  // console.dir(podcastData?.seoImage?.external?.url)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  episodes.map((episode, _episodeIndex) => {
    // if (_episodeIndex === 0 && feed) {
    //   feed.feedOptions.pubDate = episode.dateIso
    // }
    // console.dir(`episode.seoDescription`)
    // console.dir(episode.seoDescription)
    // console.dir(episode.type)
    // console.dir(`ep`)
    // console.dir(episode.mp3[0][episode.mp3[0].type].url)
    feed.addItem({
      title: episode.title,
      description: episode.seoDescription,
      url: `${url}${episode.href}`,
      // @important GUID is Unique!
      guid: episode.id,
      categories: podcastData.categories.map((category) => category.name),
      author: podcastData.author,
      date: episode.dateIso,
      // lat: 1,
      // long: 2,
      // enclosure: {
      //   url: '',
      //   file: '',
      //   size: 1,
      //   type: ''
      // },
      content: episode.seoDescription,
      itunesAuthor: podcastData.author,
      itunesExplicit: podcastData.isExplicit,
      itunesSubtitle: episode.subtitle,
      itunesSummary: episode.seoDescription,
      itunesDuration: episode.duration, // Why does this not work...
      // itunesKeywords: ['Jer&Ky', 'JerKy', 'MailShrimp'],
      itunesImage: episode?.seoImage?.external?.url,
      itunesSeason: episode.season,
      itunesEpisode: episode.episode,
      itunesTitle: episode.title,
      itunesEpisodeType: episode?.type?.name ?? 'full',
      // customNamespaces: [],
      // customElements: [{ 'itunes:subtitle': episode['Subtitle'] }],
      customElements: [
        {
          // 'content:encoded': `<![CDATA[ <b>test</b> ]]`,
          enclosure: {
            _attr: {
              url: `${episode.mp3[0][episode.mp3[0].type].url}?utm_source=Podcast`,
              length: episode?.duration,
              type: 'audio/mpeg',
            },
          },
          'media:content': {
            _attr: {
              url: episode.mp3,
              type: 'audio/mpeg',
            },
          },
        },
        // { 'itunes:duration': episode.duration },
      ],
    })
  })

  if (feed) {
    // res.status(200)
    // res.send(feed.buildXml())
    // // res.status(200).json(json.props)
    // const rss = feed.buildXML()
    // console.dir(rss)
    // return NextResponse.
    return new Response(feed.buildXml(), {
      headers: { 'Content-Type': 'application/rss+xml', charset: 'UTF-8' },
    })
  } else {
    return NextResponse.json({
      status: 404,
    })
  }

  return NextResponse.json({
    ...episodes,
    status: 200,
  })
}
