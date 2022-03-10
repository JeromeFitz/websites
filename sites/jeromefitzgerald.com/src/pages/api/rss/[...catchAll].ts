/**
 * @note Podcast RSS Feed only
 * @todo Allow for multiple types of RSS Feeds to be generated
 *
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPodcastFeed } from 'next-notion/src/getPodcastFeed'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'

import { notionConfig } from '~config/index'

const rssApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const catchAll = req.query?.catchAll

  const { data, pathVariables } = await getStaticPropsCatchAll({
    catchAll,
    notionConfig,
    preview: false,
  })

  const feed = await getPodcastFeed({ data, notionConfig, pathVariables })

  if (!!feed) {
    res.status(200)
    res.setHeader('Content-Type', 'text/xml')
    return res.send(feed)
  }

  return res.status(404).json({
    error: {
      code: 'server_error',
      message: 'No RSS Feed found',
    },
  })
}

export default rssApi
