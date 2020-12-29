import ms from 'ms'
import { NextApiRequest, NextApiResponse } from 'next'
import { isPages } from '~config/notion/website'
import { getBlog, getBlogs } from '~lib/cms-api'

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 5

export default async function getNotionApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const preview = req.query?.preview || false
    const display = req.query?.display || false
    const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    // http://localhost:3000/api/notion/blog/my-third-post?preview=true&display=true
    const isPage = isPages(catchAll[0])
    const routeType = isPage ? 'pages' : catchAll[0]
    const isIndex = !catchAll[1]
    const slug = !isIndex && catchAll[1]

    let data
    switch (routeType) {
      case 'blog':
        // console.dir(`routeType: ${routeType}`)
        // console.dir(`slug: ${slug}`)
        // console.dir(`preview: ${preview}`)
        // console.dir(`display: ${display}`)
        // console.dir(`clear: ${clear}`)
        // console.dir(catchAll)
        data = !!slug ? await getBlog(catchAll) : await getBlogs()
        break
      default:
        data = null
        break
    }

    // Set caching headers
    // @refactor(cache) Every Route Probably Does Not Need This Treatment (catchAll)

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`))
    res.setHeader('Expires', expires.toUTCString())
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    )

    if (clear) {
      const location = isPage ? '/' : `/${routeType}`
      res.clearPreviewData()
      res.writeHead(307, { Location: location })
      res.end()
    }

    const json = {
      props: {
        data,
        catchAll,
      },
      preview,
    }

    if (json?.props) {
      if (preview && display) {
        res.setPreviewData({})
        res.writeHead(307, {
          Location: `/${routeType}/${slug}`,
        })
        res.end()
      } else {
        res.status(200).json(json.props)
        // return res.status(200).json(data)
      }
    } else {
      res.status(404).json({
        status: 404,
      })
    }
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
