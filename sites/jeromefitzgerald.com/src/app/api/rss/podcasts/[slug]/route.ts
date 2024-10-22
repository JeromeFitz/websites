// https://jerandky.com/api/rss/podcasts/jer-and-ky-and-guest
// https://jerandky.com/api/rss/podcasts/knockoffs

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import _orderBy from 'lodash/orderBy.js'
import { NextRequest, NextResponse } from 'next/server.js'
import { notion } from 'next-notion/helper'
import { Podcast } from 'podcast'

// import type { PropertiesEpisode, PropertiesPodcast } from '@/app/(notion)/_config/index'
import { CONFIG, getEpisodeData, getPodcastData } from '@/app/(notion)/_config/index'

const { DATABASE_ID, SEGMENT } = CONFIG.PODCASTS

// @todo(complexity) 25
// eslint-disable-next-line complexity
export async function GET(request: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug

  const segmentInfo = getSegmentInfo({ params: { catchAll: [slug] }, SEGMENT })

  /**
   * @hack(notion) API keeps timing out so use this to generate
   *  then hard-code the XML because life is too short for any
   *  of this.
   */
  return NextResponse.json({
    segment: `/podcasts/${slug}`,
    segmentInfo,
    status: 200,
  })

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

  const isDev = envClient.NODE_ENV === 'development'
  const isPublishedAnd = isDev
    ? {
        created_time: {
          after: '2020-01-01T00:00:00.000Z',
        },
        timestamp: 'created_time',
      }
    : {
        checkbox: {
          equals: true,
        },
        property: 'Is.Published',
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
  const url = `https://${envClient.NEXT_PUBLIC__SITE}`
  const siteUrl = `${url}${podcastData.href}`
  feed = new Podcast({
    author: podcastData?.author,
    // language: 'en-US', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    categories: podcastData.categories.map((category) => category.name),
    // webMaster: podcast['Author'],
    copyright: `${year} ${podcastData?.author}`,
    customElements: [
      {
        'atom:link': {
          _attr: {
            // @todo(rss) this is the RSS FEED not the SITE URL
            href: siteUrl,
            rel: 'self',
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
    customNamespaces: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      media: 'http://search.yahoo.com/mrss',
      podcast: 'https://podcastindex.org/namespace/1.0',
    },
    description: podcastData.seoDescription,
    docs: `${url}`,
    // managingEditor: podcast['Author'],
    generator: 'ngop[odcast]',
    imageUrl: podcastData?.seoImage?.external?.url,
    // ttl: 60, // @int Number of minutes feed can be cached before refreshing from source
    itunesAuthor: podcastData?.author,
    itunesCategory: podcastData.categories.map((category) => ({
      subcats: {},
      text: category.name,
    })),
    itunesExplicit: podcastData.isExplicit ? 'yes' : 'no',
    itunesImage: podcastData?.seoImage?.external?.url,
    itunesOwner: {
      email: podcastData?.authorEmail,
      name: podcastData?.author,
    },
    itunesSubtitle: podcastData?.subtitle,
    itunesSummary: podcastData?.seoDescription,
    itunesType: podcastData.type,
    pubDate: episodes[0].dateIso,
    // feedUrl: `${url}/${routeType}/${slug}`,
    siteUrl,
    title: podcastData.title,
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
      author: podcastData.author,
      categories: podcastData.categories.map((category) => category.name),
      content: episode.seoDescription,
      // customElements: [{ 'itunes:subtitle': episode['Subtitle'] }],
      customElements: [
        {
          // 'content:encoded': `<![CDATA[ <b>test</b> ]]`,
          enclosure: {
            _attr: {
              length: episode?.duration,
              type: 'audio/mpeg',
              url: `${episode.mp3[0][episode.mp3[0].type].url}?utm_source=Podcast`,
            },
          },
          'media:content': {
            _attr: {
              type: 'audio/mpeg',
              url: episode.mp3,
            },
          },
        },
      ],
      date: episode.dateIso,
      description: episode.seoDescription,
      // @important GUID is Unique!
      guid: episode.id,
      itunesAuthor: podcastData.author,
      itunesDuration: episode.duration,
      itunesEpisode: episode.episode,
      itunesEpisodeType: episode?.type?.name ?? 'full',
      itunesExplicit: podcastData.isExplicit ? 'yes' : 'no',
      // itunesKeywords: ['Jer&Ky', 'JerKy', 'MailShrimp'],
      itunesImage: episode?.seoImage?.external?.url,
      itunesSeason: episode.season,
      itunesSubtitle: episode.subtitle,
      itunesSummary: episode.seoDescription,
      itunesTitle: episode.title,
      title: episode.title,
      // customNamespaces: [],
      url: `${url}${episode.href}`,
    })
  })

  if (feed) {
    const _data = feed.buildXml()
    // .replace(
    //   '<?xml version="1.0" encoding="UTF-8"?>',
    //   '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet href="http://localhost:3000/xml/podcasts.xls" type="text/xsl"?>'
    // )

    const data = new Response(_data, {
      headers: { charset: 'UTF-8', 'Content-Type': 'application/xml' },
    })

    return data
  } else {
    return NextResponse.json({
      segment: `/podcasts/${slug}`,
      status: 500,
    })
  }
}
