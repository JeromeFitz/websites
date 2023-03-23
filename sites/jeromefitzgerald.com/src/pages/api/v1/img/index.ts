import type { NextApiResponse } from 'next'
import { getImage } from 'next-notion/src/getImage'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development'

const debugType = (cache && isBuildStep) || isDev ? 'cache' : 'api'

const imagesApi = async (req: any, res: NextApiResponse) => {
  try {
    const { url } = req.query

    if (!url || url === 'undefined') return res.status(404).json({})

    const start = Date.now()
    const data = await getImage(url)
    if (!!data) {
      const key = data.id
      const debug = {
        key,
        latency: Date.now() - start,
        type: debugType,
      }

      return res.status(200).json({ ...data, debug })
    } else {
      return res.status(400).json({
        error: {
          code: 'server_error',
          message: 'Bad request',
        },
      })
    }
  } catch (e) {
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}

export default imagesApi
