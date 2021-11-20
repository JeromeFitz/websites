import { NextApiRequest, NextApiResponse } from 'next'

// import { getCache, setCache } from '~lib/notion/getCache'
import getPathVariables from '~lib/notion/getPathVariables'
import getByListing from '~lib/notion/queries/getByListing'
import getByListingWithDate from '~lib/notion/queries/getByListingWithDate'
import getBySlug from '~lib/notion/queries/getBySlug'
import getBySlugWithRouteType from '~lib/notion/queries/getBySlugWithRouteType'

// complexity 14
// eslint-disable-next-line complexity
const A_GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const preview = req.query?.preview || false
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll

    // console.dir(`catchAll`)
    // console.dir(catchAll)
    if (catchAll[0] === 'true') return res.status(200).json({})
    /**
     * @cache
     */
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cache = false

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = getPathVariables(catchAll)
    // console.dir(pathVariables)

    let dataReturn = null
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, meta, routeType, slug } = pathVariables

    let DATATYPE_DATA

    // @todo(switch)
    switch (dataType) {
      case 1:
      case 5:
        DATATYPE_DATA = await getBySlug({ pathVariables, routeType, slug })
        break
      case 2:
        DATATYPE_DATA = await getByListing({ pathVariables, routeType })
        break
      case 3:
        DATATYPE_DATA = await getByListingWithDate({ meta, routeType, slug })
        break
      case 4:
        DATATYPE_DATA = await getBySlugWithRouteType({ meta, routeType, slug })
        break
      default:
        break
    }

    content = DATATYPE_DATA?.content || null
    images = DATATYPE_DATA?.images || null
    info = DATATYPE_DATA?.info || null
    items = DATATYPE_DATA?.items || null

    dataReturn = { info, content, items, images }

    res.status(200).json(dataReturn)
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

export default A_GET
