import _find from 'lodash/find'
import { NextApiRequest, NextApiResponse } from 'next'

import getPagesById from '~lib/notion/api/getPagesById'
import { PROPERTIES } from '~lib/notion/schema'

const PAGE_ID = '77d3a22ae6f84bc8a6f34de53a8c88e2'

const A_GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getPagesById({ pageId: PAGE_ID })

  const { properties } = data

  const KEYS = Object.keys(properties)

  const FOO = {}
  KEYS.map((key) => {
    console.dir(`---`)
    console.dir(`key: ${key}`)
    const found = _find(PROPERTIES, { notion: key })
    console.dir(`found: ${found ? 'y' : 'n'}`)
    console.dir(found)

    FOO[found.key] = properties[key]
  })

  const output = { properties, FOO }

  res.status(200).json(output)
}

export default A_GET
