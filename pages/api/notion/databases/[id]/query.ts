import { NextApiRequest, NextApiResponse } from 'next'

const notionDatabasesIdQuery = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionDatabasesIdQuery`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionDatabasesIdQuery
