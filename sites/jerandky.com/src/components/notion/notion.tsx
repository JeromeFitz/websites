import { NotionBlocks } from "next-notion/notion.blocks";

import { blocks } from "./notion.config";

// @todo(types)
function Notion({ data }: { data: any }) {
  return <NotionBlocks blocks={blocks} data={data} />;
}

export { Notion };
