import _size from 'lodash/size'
import { NextApiRequest, NextApiResponse } from 'next'

import createPage from '~lib/notion/api/createPage'
import children from '~lib/notion/create/children'
import properties, { slug } from '~lib/notion/create/properties'
import getCatchAll from '~lib/notion/getCatchAll'
// import getPathVariables from '~lib/notion/getPathVariables'
import { DATABASES } from '~utils/notion/helper'
// const isObjectEmpty = '~utils/isObjectEmpty'

const isObjectEmptyDeep = (obj) =>
  Object.values(obj).every((x) =>
    Object.values(x).every(
      (x2) => 0 === Object.entries(x2).length && x2.constructor === Object
    )
  )

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
  let data = null
  let _data = null,
    _type = 'exists',
    _id
  const catchAll = ['podcasts', 'jer-and-ky-and-guest', slug]
  data = await getCatchAll({
    preview: false,
    cache: false,
    clear: false,
    catchAll,
  })
  if (
    !data ||
    data === undefined ||
    (_size(data.content) === 0 && isObjectEmptyDeep(data.info))
  ) {
    data = await createPage({ ...page })
    _type = 'create'
    _data = data
    _id = _data.id

    // Get Latest Data
    data = await getCatchAll({
      preview: false,
      cache: false,
      clear: false,
      catchAll,
    })
  } else {
    _id = data.info.id
  }

  try {
    res.status(200).json({ _type, _id, ...data })
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
