import { Client } from "@notionhq/client";
import { envServer } from "next-config/env.server";

import type { Segment } from "@/utils/get-by-segment";
import { getBySegment } from "@/utils/get-by-segment";

import type { NotionSeoImage } from "./types";

const notion = new Client({ auth: envServer.NOTION_API_KEY });

async function getDataSourceId(database_id: string): Promise<string> {
  const database = await notion.databases.retrieve({ database_id });
  const data_source_id = "data_sources" in database ? database.data_sources[0]?.id : undefined;
  if (!data_source_id) {
    throw new Error(`No data source found for Notion database ${database_id}`);
  }
  return data_source_id;
}

const checkForMore = true;
const page_size = 50;
/**
 * @todo(notion) Scenario: Day 1: Is.Published; Day 2: !Is.Published; Cache will not update.
 * Unless you handle _all_ of these and my goodness, no. Care about ~15, not ~150.
 * But I also guess its just DB records at this point
 */
const filter_isPublishedAnd = {
  checkbox: {
    equals: true,
  },
  property: "Is.Published",
};

export async function getNotionDatabase({ database_id }: { database_id: string }) {
  return await notion.databases.retrieve({ database_id });
}
/**
 * @note(notion)
 * 🚧 This endpoint will not accurately return properties that exceed 25 references
 * Instead, use the Retrieve a page property endpoint for the specific property to get its complete reference list
 * Get a Database to see all Properties
 */
export async function getNotionPage({ page_id }: { page_id: string }) {
  return await notion?.pages?.retrieve({
    page_id,
  });
}
export async function getNotionPageProperty({
  page_id,
  property_id,
}: {
  page_id: string;
  property_id: string;
}) {
  return await notion.pages.properties.retrieve({
    page_id,
    property_id,
  });
}

export async function getNotionBlock({ block_id }: { block_id: string }) {
  /**
   * @note(notion)
   * To retrieve page content for a specific page set the page ID as the block_id
   *
   * If the block returned contains the key has_children: true,
   *  use getNotionBlocks to get the list of children.
   */
  return await notion.blocks.retrieve({ block_id });
}
export async function getNotionBlocks({ block_id }: { block_id: string }) {
  const options = { block_id };
  let _response = await notion.blocks.children.list(options);
  let _results = _response?.results;
  let i = 0;
  if (checkForMore) {
    while (_response.has_more && _response.next_cursor) {
      console.info(`getNotionBlocks(${block_id}) > has_more: ${i}`);
      _response = await notion.blocks.children.list({
        ...options,
        start_cursor: _response.next_cursor,
      });

      const __results = _response.results;
      _results = _results.concat(__results);
      i++;
    }
  }
  _response.results = _results;

  return _response;
}

export async function getNotionItems(segment: Segment) {
  const data_source_id = await getDataSourceId(getBySegment[segment].notionDatabaseId);
  const options = {
    data_source_id,
    filter: {
      and: [filter_isPublishedAnd],
    },
    page_size,
  };

  let _response = await notion.dataSources.query(options);
  let _results = _response?.results;
  let i = 0;
  if (checkForMore) {
    while (_response.has_more && _response.next_cursor) {
      console.info(`getNotionItems(${segment}) > has_more: ${i}`);
      _response = await notion.dataSources.query({
        ...options,
        start_cursor: _response.next_cursor,
      });

      const __results = _response.results;
      _results = _results.concat(__results);
      i++;
    }
  }
  _response.results = _results;

  return _response;
}

export async function getNotionSeoImage({
  segment,
  slug,
}: {
  segment: Segment;
  slug: string;
}): Promise<NotionSeoImage> {
  const data_source_id = await getDataSourceId(getBySegment[segment].notionDatabaseId);
  const options = {
    data_source_id,
    filter: {
      and: [
        {
          property: "Slug.Preview",
          rich_text: {
            equals: slug,
          },
        },
        filter_isPublishedAnd,
      ],
    },
    page_size,
  };

  const _response: any = await notion.dataSources.query(options);
  return {
    "SEO.Image": _response.results[0].properties["SEO.Image"],
    "Slug.Preview": _response.results[0].properties["Slug.Preview"],
  };
}
