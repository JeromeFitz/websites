import { NextApiRequest, NextApiResponse } from 'next'

const notionDatabases = (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionDatabases`)
  return res.status(500).json({
    error: {
      code: 'server_error',
      message: 'Internal server error',
    },
  })
}

export default notionDatabases
