/* eslint-disable prefer-const */
import { Client } from '@jeromefitz/notion'
import { NextApiRequest, NextApiResponse } from 'next'

import { notionConfig as config } from '~config/websites'

const notion = new Client({ auth: process.env.NOTION_API_KEY, config })

const MOCK = {
  LISTING: {
    pathVariables: {
      dataType: 'LISTING',
      hasMeta: false,
      isPage: false,
      isIndex: true,
      meta: [],
      routeType: 'shows',
      slug: 'shows',
      url: 'shows',
    },
    routeType: 'shows',
    slug: 'shows',
  },
  LISTING_BY_DATE: {
    pathVariables: {
      dataType: 'LISTING_BY_DATE',
      hasMeta: true,
      isPage: false,
      isIndex: true,
      meta: ['2021'],
      routeType: 'events',
      slug: 'events',
      url: 'events/2021',
    },
    routeType: 'events',
    slug: 'events',
  },
  SLUG: {
    pathVariables: {
      dataType: 'SLUG',
      hasMeta: false,
      isPage: false,
      isIndex: false,
      meta: [],
      routeType: 'shows',
      slug: 'alex-o-jerome',
      url: 'shows/alex-o-jerome',
    },
    routeType: 'shows',
    slug: 'alex-o-jerome',
  },
  SLUG_BY_ROUTE: {
    pathVariables: {
      dataType: 'SLUG_BY_ROUTE',
      hasMeta: true,
      isPage: false,
      isIndex: false,
      meta: ['2021', '10', '09', 'the-playlist'],
      routeType: 'events',
      slug: 'the-playlist',
      url: 'events/2021/10/09/the-playlist',
    },
    routeType: 'events',
    slug: 'the-playlist',
  },
}

const NotionSecret = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @testing
   */

  let data: any

  data = await notion.dataTypes[MOCK.LISTING.pathVariables?.dataType]({
    ...MOCK.LISTING,
  })

  // data = await notion.dataTypes[MOCK.LISTING_BY_DATE.pathVariables?.dataType]({
  //   ...MOCK.LISTING_BY_DATE,
  // })

  // data = await notion.dataTypes[MOCK.SLUG.pathVariables?.dataType]({
  //   ...MOCK.SLUG,
  // })

  // data = await notion.dataTypes[MOCK.SLUG_BY_ROUTE.pathVariables?.dataType]({
  //   ...MOCK.SLUG_BY_ROUTE,
  // })

  try {
    res.status(200).json({
      ...data,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found`,
      },
    })
  }
}

export default NotionSecret
