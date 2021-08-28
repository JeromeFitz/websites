import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlaiceholder } from 'plaiceholder'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { base64, img } = await getPlaiceholder(
    'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2020/01/_original/2020-01--sf-sketchfest--000--jerome--bob-shields.jpg'
  )

  return res.status(200).json({ base64, img })
}
