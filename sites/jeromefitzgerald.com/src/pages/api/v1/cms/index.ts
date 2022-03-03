import {
  getCatchAll,
  getDataReturn,
  getNotion,
} from '@jeromefitz/shared/src/lib/notion'
import { NextApiResponse } from 'next'

import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)

const { PAGES__HOMEPAGE } = notionConfig

const notionCatchAll = async (req: any, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const _revalidate = req.query?.revalidate || 'false'
    const revalidate = _revalidate === 'true' ? true : false
    const catchAll = [PAGES__HOMEPAGE]
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
        notionConfig,
        pathVariables,
        preview,
        revalidate,
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
