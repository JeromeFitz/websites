import { NotionBlocks } from 'next-notion/Notion.Blocks'

import { blocks } from './Notion.Config'

// @todo(types)
function Notion({ data }: { data: any }) {
  return <NotionBlocks blocks={blocks} data={data} />
}

export { Notion }
