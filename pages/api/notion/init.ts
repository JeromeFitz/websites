/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @note Notion Init
 * 0. Top Level: Y, Skip -- N, Create
 * 1. Website: Y, Skip -- N, Create
 * 2. Pages: Y, Skip -- N, Create (LOOP)
 * 3. **Not Necessary** Table Data, Y, Update -- N, Create
 */

import type { NextApiRequest, NextApiResponse } from 'next'

import createTopLevel from '~lib/notion/init/createTopLevel'
import createWebsite from '~lib/notion/init/createWebsite'
import createPageWithInlineTable from '~lib/notion/init/createPageWithInlineTable'
// import createPageWithInlineTableItem from '~lib/notion/init/createPageWithInlineTableItem'

let CREATE: string = null
// CREATE = 'topLevel'
// CREATE = 'website'
// CREATE = 'pageWithInlineTable'

let STATE = null

const notionInit = async (_req: NextApiRequest, res: NextApiResponse) => {
  switch (CREATE) {
    case 'topLevel':
      await createTopLevel()
      STATE = '🔝️ Created Successfully'
      break
    case 'website':
      await createWebsite()
      STATE = '🌐️ Created Successfully'
      break
    case 'pageWithInlineTable':
      await createPageWithInlineTable()
      STATE = '📃️ Created Successfully'
      break
    // // @todo Broken, handle with physical imports please
    // case 'pageWithInlineTableItem':
    //   await createPageWithInlineTableItem()
    //   break
    default:
      CREATE = '__TODO__'
      STATE = '❎️ Verify Notion Configuration to prevent Overwrites'
      break
  }

  res.status(200).json({
    [CREATE]: STATE,
  })
}

export default notionInit
