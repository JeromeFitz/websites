import { NextApiRequest, NextApiResponse } from 'next'

const notionPages = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionPages`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionPages
