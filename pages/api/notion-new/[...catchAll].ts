import { NextApiRequest, NextApiResponse } from 'next'

import { getPathVariables } from '~utils/notion/prepareNotionData'
import getPage from '~utils/notion/getPage'
import getSearch from '~utils/notion/getSearch'

const notionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const preview = req.query?.preview || false
    // const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = getPathVariables(catchAll)

    let info = await getSearch(pathVariables, preview)
    const pageId = pathVariables.isIndex ? '' : info.results[0].id
    let content = await getPage(pathVariables, pageId)
    let items = null

    /**
     * @isIndex override (blog|events)
     */
    if (pathVariables.isIndex) {
      const _info = info
      info = content
      content = await getPage(pathVariables, info?.id)
      items = _info
    }

    res.status(200).json({
      info,
      content,
      items,
    })
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

export default notionApi
