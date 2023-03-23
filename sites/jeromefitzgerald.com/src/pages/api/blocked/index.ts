import type { NextApiRequest, NextApiResponse } from 'next'

function Blocked(_req: NextApiRequest, res: NextApiResponse) {
  res.status(429)
  return res.end()
}

export default Blocked
