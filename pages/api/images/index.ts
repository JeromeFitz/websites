import Slugger from 'github-slugger'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlaiceholder } from 'plaiceholder'

const imagesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query

  const slugger = new Slugger()
  const slug = slugger.slug(url)
  const { base64, img } = await getPlaiceholder(url)

  return res.status(200).json({ base64, img, slug, url })
}

export default imagesApi
