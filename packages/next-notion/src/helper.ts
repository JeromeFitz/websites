import { envServer as env } from "@jeromefitz/next-config/env.server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: env.NOTION_API_KEY,
});

async function getDataSourceId(database_id: string): Promise<string> {
  const database = await notion.databases.retrieve({ database_id });
  const data_source_id = "data_sources" in database ? database.data_sources[0]?.id : undefined;
  if (!data_source_id) {
    throw new Error(`No data source found for Notion database ${database_id}`);
  }
  return data_source_id;
}

export { getDataSourceId, notion };
