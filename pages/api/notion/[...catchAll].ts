import { NextApiRequest, NextApiResponse } from 'next'

import getCatchAll from '~lib/notion/getCatchAll'

const notionSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const data = await getCatchAll({ preview, clear, catchAll })

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
