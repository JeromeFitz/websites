import { blocks } from '@/lib/notion/config'
import { NotionBlocks } from '@/lib/notion/Notion.Blocks'

function Notion({ data }: { data: any }) {
  return <NotionBlocks blocks={blocks} data={data} />
}

export { Notion }
