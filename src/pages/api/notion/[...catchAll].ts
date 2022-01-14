// import { queries } from '@jeromefitz/notion'
import getPathVariables from '@jeromefitz/notion/queries/getPathVariables'
import { NextApiRequest, NextApiResponse } from 'next'

import { notionConfig } from '~config/websites'
import getCatchAll from '~lib/notion/getCatchAll'

const CatchAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll

    if (catchAll[0] === 'true') return res.status(200).json({})
    /**
     * @cache
     */
    // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
    const cache = false

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    // const pathVariables = queries.getPathVariables({
    const pathVariables = getPathVariables({
      config: notionConfig,
      catchAll,
    })

    const data = await getCatchAll({
      cache,
      catchAll,
      clear,
      pathVariables,
      preview,
    })

    res.status(200).json(data)
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
