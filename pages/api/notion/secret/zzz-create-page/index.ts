import _size from 'lodash/size'
import { NextApiRequest, NextApiResponse } from 'next'

import createPage from '~lib/notion/api/createPage'
// @todo(notion) this no longer works!
import children from '~lib/notion/create/children'
// @todo(notion) this no longer works!
import properties from '~lib/notion/create/properties'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import { DB } from '~lib/notion/helper'
// const isObjectEmpty = '~utils/isObjectEmpty'

const isDev = process.env.NODE_ENV === 'development'

const isObjectEmptyDeep = (obj) =>
  Object.values(obj).every((x) =>
    Object.values(x).every(
      (x2) => 0 === Object.entries(x2).length && x2.constructor === Object
    )
  )

const secretCreatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isDev) {
    return res.status(200).json({})
  }
  const routeType = 'episodes'
  const databaseId = DB[routeType.toUpperCase()].database_id
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
  /**
   * @notion Check if Page Exists
   * Y: UPDATE, but only update "new" fields provided
   * N: CREATE
   */
  let data = null
  let _data = null,
    _type = 'exists',
    _id
  // @todo(notion) this no longer works!
  const slug = 'am-i-dracula-greg-gillotti'
  const catchAll = ['podcasts', 'jer-and-ky-and-guest', slug]
  const pathVariables = getPathVariables(catchAll)
  data = await getCatchAll({
    cache: false,
    catchAll,
    clear: false,
    pathVariables,
    preview: false,
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
      cache: false,
      catchAll,
      clear: false,
      pathVariables,
      preview: false,
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
