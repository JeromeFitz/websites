import { NextApiRequest, NextApiResponse } from 'next'

import createPage from '~lib/notion/api/createPage'
import children from '~lib/notion/create/children'
import properties from '~lib/notion/create/properties'
import { DATABASES } from '~utils/notion/helper'

const routeType = 'episodes'
const databaseId = DATABASES[routeType]
const icon = {
  type: 'emoji',
  emoji: '🦇',
}

const page = {
  object: 'page',
  cover: null,
  icon,
  parent: {
    database_id: databaseId,
  },
  properties,
  children,
}

const secretCreatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @notion Check if Page Exists
   * Y: UPDATE, but only update "new" fields provided
   * N: CREATE
   */
  const data = await createPage({ ...page })

  try {
    res.status(200).json(data)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found`,
      },
    })
  }
}

export default secretCreatePage
