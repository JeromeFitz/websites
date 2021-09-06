// 4fd37202-ec62-4897-a0dd-5ed8ab8b4b53

import { NextApiRequest, NextApiResponse } from 'next'

import { notion } from '~utils/notion/helper'

const notionPagesId = async (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionPagesId`)
  const page_id = req.query.id
  try {
    const data = await notion.pages.retrieve({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      page_id,
    })

    res.status(200).json({
      ...data,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      // error: {
      //   code: 'server_error',
      //   message: 'Internal server error',
      // },
      error: {
        code: 404,
        message: `Not found: ${page_id}`,
      },
    })
  }
}

export default notionPagesId
