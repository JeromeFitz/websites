import _ from 'lodash'
import _find from 'lodash/find'
import _startsWith from 'lodash/startsWith'
import { NextApiRequest, NextApiResponse } from 'next'

import getPagesById from '~lib/notion/api/getPagesById'
import getTypes from '~lib/notion/api/getTypes'
import { PROPERTIES } from '~lib/notion/schema'

const PAGE_ID = '77d3a22ae6f84bc8a6f34de53a8c88e2'
const ROUTE_TYPE = 'SHOWS'

const A_GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getPagesById({ pageId: PAGE_ID })

  const { properties } = data

  const KEYS = Object.keys(properties)

  const DATA = {}
  KEYS.map((key) => {
    const found = _find(PROPERTIES, { notion: key })

    /**
     * @todo type is not ready yet
     */
    if (['people'].includes(found.type)) {
      return
    }

    /**
     * @hack limit posisble relations
     */
    if (_startsWith(found.key, 'relation')) {
      if (
        !_startsWith(
          found.key.toUpperCase(),
          `relation${ROUTE_TYPE}__`.toUpperCase()
        )
      )
        return
    }
    /**
     * @hack limit posisble relations
     */
    if (_startsWith(found.key, 'rollup')) {
      if (
        !_startsWith(found.key.toUpperCase(), `rollup${ROUTE_TYPE}__`.toUpperCase())
      )
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
