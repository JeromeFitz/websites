import { NextApiResponse } from 'next'
import { getCatchAll } from 'next-notion/src/getCatchAll'
import { getDataReturn } from 'next-notion/src/getDataReturn'
import { getNotion } from 'next-notion/src/helper'

import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)

const { PAGES__HOMEPAGE } = notionConfig

/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
// const isBuildStep = process.env.CI
// const isDev = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
// const cacheOverride =
process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
// const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL

const notionCatchAll = async (req: any, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = [PAGES__HOMEPAGE]

    // http://localhost:3000/api/v1/cms/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = notion.custom.getPathVariables({
      catchAll,
    })

    const start = Date.now()
    const data = await getDataReturn({
      data: await getCatchAll({
        catchAll,
        clear,
        notionConfig,
        pathVariables,
        preview,
      }),
      pathVariables,
    })
    const debug = {
      latency: Date.now() - start,
      type: cache ? 'cache' : 'api',
    }

    res.status(200).json({ ...data, debug })
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

export default notionCatchAll
