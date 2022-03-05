import { NextApiResponse } from 'next'
import { nextWeirdRoutingSkipData } from 'next-notion/src/constants'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'
import { getNotion } from 'next-notion/src/helper'

import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)

/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
// const isBuildStep = process.env.CI
// const isDev = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
// const cacheOverride =
process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
// const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL

// @todo(complexity) 12
// eslint-disable-next-line complexity
const CatchAll = async (req: any, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll

    if (nextWeirdRoutingSkipData.includes(catchAll[0])) {
      return res.status(403).json({
        error: {
          code: 'forbidden',
          message: 'Pound sand',
        },
      })
    }

    // http://localhost:3000/api/v1/cms/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = notion.custom.getPathVariables({
      catchAll,
    })
    // console.dir(`> pathVariables`)
    // console.dir(pathVariables)

    const start = Date.now()
    const data = await getStaticPropsCatchAll({
      catchAll,
      clear,
      notionConfig,
      pathVariables,
      preview,
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

export default CatchAll
