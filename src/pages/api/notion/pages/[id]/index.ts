// 4fd37202-ec62-4897-a0dd-5ed8ab8b4b53
// import _omit from 'lodash/omit'
import dataNormalized from '@jeromefitz/notion/utils/dataNormalized'
import { avoidRateLimit, sortObject } from '@jeromefitz/utils'
import { NextApiRequest, NextApiResponse } from 'next'

import { notionConfig as config } from '~config/websites'
import { getCache, setCache } from '~lib/notion/getCache'
import { notion } from '~lib/notion/helper'
// import omitFields from '~lib/notion/omitFields'

// const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
const useCache = false

const notionPagesId = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.dir(`notionPagesId`)
  const page_id = req.query.id
  const catchAll = ['api', 'notion', 'pages', page_id]
  /**
   * @cache pre
   */
  let data
  if (useCache) {
    const url = catchAll.join('/')
    const cacheData = await getCache(url)
    if (!!cacheData) {
      data = cacheData
    }
  }

  if (!data || data === undefined) {
    await avoidRateLimit()
    const contentData = await notion.pages.retrieve({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      page_id,
    })
    data = sortObject(
      dataNormalized({
        config,
        data: contentData,
        pathVariables: null,
        pageId: page_id,
      })
    )
    /**
     * @cache post
     */
    if (useCache && !!data) {
      const url = catchAll.join('/')
      // console.dir(url)
      const isCacheExists = await getCache(url)
      // console.dir(isCacheExists)
      if (!isCacheExists || isCacheExists === undefined) {
        setCache(data, url)
      }
    }
  }

  try {
    /**
     * @json should this be omitted at write time?
     */
    // const dataOmittted = _omit(data, omitFields['people'])
    const dataOmittted = data
    res.status(200).json({
      ...dataOmittted,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found: ${page_id}`,
      },
    })
  }
}

export default notionPagesId
