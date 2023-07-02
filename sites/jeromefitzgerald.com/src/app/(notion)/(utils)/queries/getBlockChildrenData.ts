import 'server-only'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

/**
 * @todo(error-handling)
 */
async function getBlockChildrenData(block_id) {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100, // max
  })
  return response
}

export { getBlockChildrenData }
