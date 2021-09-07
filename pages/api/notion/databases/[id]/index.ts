import { NextApiRequest, NextApiResponse } from 'next'

const notionDatabasesId = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionDatabasesId`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionDatabasesId
