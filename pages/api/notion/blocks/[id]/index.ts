import { NextApiRequest, NextApiResponse } from 'next'

const notionBlocksId = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionBlocksId`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionBlocksId
