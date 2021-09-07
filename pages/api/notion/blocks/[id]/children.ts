import { NextApiRequest, NextApiResponse } from 'next'

const notionBlocksIdChildren = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionBlocksIdChildren`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionBlocksIdChildren
