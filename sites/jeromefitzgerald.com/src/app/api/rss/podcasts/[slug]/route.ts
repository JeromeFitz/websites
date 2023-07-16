// https://jerandky.com/api/rss/podcasts/jer-and-ky-and-guest
// https://jerandky.com/api/rss/podcasts/knockoffs

import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
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

  const segmentInfo = getSegmentInfo({ SEGMENT, params: { catchAll: [slug] } })

  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: false,
    filterType: 'equals',
    revalidate: false,
    segmentInfo,
  })

  if (isObjectEmpty(data?.blocks)) {
    return NextResponse.json({
      segment: `/podcasts/${slug}`,
      status: 404,
    })
  }
  const podcastData = getPodcastData(data?.page?.properties)

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
  // @todo(types)
  const options: any = {
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

  const dataEpisodes = await notion.databases.query(options)
  // @todo(types)
  const _episodes = dataEpisodes.results.map((episode: any) => {
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
    imageUrl: podcastData?.seoImage?.external?.url,
    title: podcastData.title,
    description: podcastData.seoDescription,
    generator: 'ngop[odcast]',
    // feedUrl: `${url}/${routeType}/${slug}`,
    siteUrl,
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
    itunesExplicit: podcastData.isExplicit ? 'yes' : 'no',
    itunesCategory: podcastData.categories.map((category) => ({
      text: category.name,
      subcats: {},
    })),
    itunesImage: podcastData?.seoImage?.external?.url,
    itunesType: podcastData.type,
    customNamespaces: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      media: 'http://search.yahoo.com/mrss',
      podcast: 'https://podcastindex.org/namespace/1.0',
    },
    customElements: [
      {
        'atom:link': {
          _attr: {
            rel: 'self',
            href: siteUrl,
            type: 'application/rss+xml',
          },
        },
      },
      { language: 'en-US' },
      {
        image: [
          { url: podcastData?.seoImage?.external?.url },
          { title: podcastData?.title },
          { link: siteUrl },
        ],
      },
    ],
  })

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
      content: episode.seoDescription,
      itunesAuthor: podcastData.author,
      itunesExplicit: podcastData.isExplicit ? 'yes' : 'no',
      itunesSubtitle: episode.subtitle,
      itunesSummary: episode.seoDescription,
      itunesDuration: episode.duration,
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
      ],
    })
  })

  if (feed) {
    const _data = feed
      .buildXml()
      .replace(
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet href="http://localhost:3000/xml/podcasts.xls" type="text/xsl"?>'
      )

    const data = new Response(_data, {
      headers: { 'Content-Type': 'application/xml', charset: 'UTF-8' },
    })

    return data
  } else {
    return NextResponse.json({
      segment: `/podcasts/${slug}`,
      status: 500,
    })
  }
}
