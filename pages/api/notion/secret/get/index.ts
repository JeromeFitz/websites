import _ from 'lodash'
import _find from 'lodash/find'
import { NextApiRequest, NextApiResponse } from 'next'

import getPagesById from '~lib/notion/api/getPagesById'
import getTypes from '~lib/notion/api/getTypes'
import { PROPERTIES } from '~lib/notion/schema'

const PAGE_ID = '77d3a22ae6f84bc8a6f34de53a8c88e2'

const A_GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getPagesById({ pageId: PAGE_ID })

  const { properties } = data

  const KEYS = Object.keys(properties)

  const DATA = {}
  KEYS.map((key) => {
    const found = _find(PROPERTIES, { notion: key })

    // @todo(notion)
    if (['people'].includes(found.type)) {
      return
    }

    const _data = getTypes[found.type](properties[key])

    DATA[found.key] = _data
  })

  const dataSorted = (data: any) => _(data).toPairs().sortBy(0).fromPairs().value()

  const output = { properties, data: dataSorted(DATA) }

  res.status(200).json(output)
}

export default A_GET
