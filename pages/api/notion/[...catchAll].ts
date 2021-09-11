// import _isBoolean from 'lodash/isBoolean'
import { NextApiRequest, NextApiResponse } from 'next'

import getCatchAll from '~lib/notion/getCatchAll'

const notionSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const data = await getCatchAll({ preview, cache, clear, catchAll })

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

export default notionSearch
