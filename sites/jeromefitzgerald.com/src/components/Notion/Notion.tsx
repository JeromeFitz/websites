import { NotionBlocks } from 'next-notion/Notion.Blocks'

import { blocks } from './Notion.Config'

// @todo(types)
function Notion({ data }: { data: any }) {
  return <NotionBlocks data={data} blocks={blocks} />
}

export { Notion }
