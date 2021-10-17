// import _isBoolean from 'lodash/isBoolean'
// import _omit from 'lodash/omit'
import { NextApiRequest, NextApiResponse } from 'next'

import { SLUG__HOMEPAGE } from '~lib/constants'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
// import omitFields from '~lib/notion/omitFields'

const notionCatchAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = [SLUG__HOMEPAGE]
    /**
     * @cache
     */
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
    const cache = false

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = getPathVariables(catchAll)
    const data = await getCatchAll({
      cache,
      clear,
      catchAll,
      pathVariables,
      preview,
    })
    // const dataOmittted = _omit(data, omitFields[routeType])
    const dataOmittted = data

    res.status(200).json({ ...dataOmittted })
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
