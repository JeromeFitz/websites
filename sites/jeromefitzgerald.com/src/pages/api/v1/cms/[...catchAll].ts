import { NextApiResponse } from 'next'

import getCatchAll from '~lib/notion/getCatchAll'
import getDataReturn from '~lib/notion/getDataReturn'
import { notion } from '~lib/notion/helper'

// @todo(complexity) 12
// eslint-disable-next-line complexity
const CatchAll = async (req: any, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll
    const _images = req.query?.images || 'true'
    const images = _images === 'true' ? true : false
    const _revalidate = req.query?.revalidate || 'false'
    const revalidate = _revalidate === 'true' ? true : false

    if (catchAll[0] === 'true') return res.status(200).json({})
    /**
     * @cache
     */
    const cache = !!req.query?.cache ? JSON.parse(req?.query?.cache) : true

    // http://localhost:3000/api/v1/cms/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = notion.custom.getPathVariables({
      catchAll,
    })

    const start = Date.now()
    const data = await getDataReturn({
      data: await getCatchAll({
        cache,
        catchAll,
        clear,
        pathVariables,
        preview,
        revalidate,
      }),
      pathVariables: {
        ...pathVariables,
        images,
      },
    })
    const debug = {
      latency: Date.now() - start,
      type: cache && !revalidate ? 'cache' : 'api',
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
