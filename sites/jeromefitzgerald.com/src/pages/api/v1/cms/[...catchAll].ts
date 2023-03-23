import { NextApiResponse } from 'next'
import { nextWeirdRoutingSkipData, TIME } from 'next-notion/src/constants'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'
import { getKeysByJoin } from 'next-notion/src/utils'

import { notionConfig } from '~config/index'

const cache = process.env.NOTION_USE_CACHE === 'true' ? true : false
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development'

const debugType = (cache && isBuildStep) || isDev ? 'cache' : 'api'

/**
 * @todo(security) can we improve this?
 */
const token = process.env.PREVIEW_TOKEN

// @todo(complexity) 12
// eslint-disable-next-line complexity
const CatchAll = async (req: any, res: NextApiResponse) => {
  try {
    const preview = req.query?.preview === 'true' ? true : false || false
    const clear = req.query?.clear === 'true' ? true : false || false
    const catchAll = req.query?.catchAll
    const key = getKeysByJoin({
      keyData: catchAll,
      keyPrefix: 'notion',
    })

    if (clear) {
      res.clearPreviewData()
      res.writeHead(307, { Location: '/' })
      res.end()
    }

    if (preview && req.query.secret !== token) {
      return res.status(401).json({
        error: {
          code: 'unauthorized',
          message: 'Invalid token',
        },
      })
    }

    if (nextWeirdRoutingSkipData.includes(catchAll[0])) {
      return res.status(403).json({
        error: {
          code: 'forbidden',
          message: 'Pound sand',
        },
      })
    }

    const start = Date.now()
    const { data, pathVariables } = await getStaticPropsCatchAll({
      catchAll,
      notionConfig,
      preview,
    })
    const debug = {
      key,
      latency: Date.now() - start,
      type: debugType,
    }

    if (preview && !!data?.info) {
      const { url } = pathVariables
      res.setPreviewData({}, { maxAge: TIME.HOUR })
      res.writeHead(307, { Location: `/${url}` })
      res.end()
    } else {
      return res.status(200).json({ ...data, debug })
    }
  } catch (e) {
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
