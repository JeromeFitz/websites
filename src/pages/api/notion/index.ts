// import _isBoolean from 'lodash/isBoolean'
// import _omit from 'lodash/omit'
import { NextApiRequest, NextApiResponse } from 'next'

import { notionConfig } from '~config/websites'
import getCatchAll from '~lib/notion/getCatchAll'
import getDataReturn from '~lib/notion/getDataReturn'
import { notion } from '~lib/notion/helper'

const { PAGES__HOMEPAGE } = notionConfig

const notionCatchAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = [PAGES__HOMEPAGE]
    /**
     * @cache
     */
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
    const cache = false

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = notion.custom.getPathVariables({
      catchAll,
    })
    const data = await getDataReturn({
      data: await getCatchAll({
        cache,
        catchAll,
        clear,
        pathVariables,
        preview,
      }),
      pathVariables,
    })

    res.status(200).json({ ...data })
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
