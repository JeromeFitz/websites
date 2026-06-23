import { blocks } from "@/lib/notion/config";
import { NotionBlocks } from "@/lib/notion/notion.blocks";

function Notion({ data }: { data: any }) {
  return <NotionBlocks blocks={blocks} data={data} />;
}

export { Notion };
