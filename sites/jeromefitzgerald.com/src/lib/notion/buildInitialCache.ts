import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import type { NotionPropertiesShow } from '@/lib/drizzle/schemas/cache-shows/types'
import type { Segment } from '@/utils/getBySegment'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import {
  getNotionBlocks,
  getNotionItems,
} from '@/lib/drizzle/schemas/_notion/queries'
import { addItemToCache } from '@/lib/drizzle/utils'

type Properties = NotionPropertiesShow

/**
 * @todo(notion) This is for List, still need to do this for Specific Routes
 */
export async function buildInitialCache({
  revalidate,
  segment,
}: {
  revalidate?: boolean
  segment: Segment
}) {
  /**
   * MIGRATION: Notion => Neon Cache
   */
  const isBreakCache = envClient.OVERRIDE_CACHE || revalidate
  if (isBreakCache) {
    // console.dir(`!!! => segment: ${segment}; isBreakCache: ${isBreakCache}`)
    const notion_items = await getNotionItems(segment)
    if (notion_items?.results) {
      void notion_items?.results.map(async (result: any) => {
        const properties: Properties = result?.properties
        // @todo(types)

        // @ts-ignore
        const key = properties['Slug.Preview'].formula.string
        const value = [
          {
            ...result,
            properties,
          },
        ]
        /**
         * info
         */
        // console.dir(`@@@ => info`)
        await addItemToCache({ key, segment, value })
        /**
         * content
         */
        // console.dir(`@@@ => content`)
        const item = value[0]
        const blocks: ListBlockChildrenResponse = await getNotionBlocks({
          block_id: item.id,
        })
        await addItemToCache({ key, segment: 'blocks', value: [blocks] })
      })
    } else {
      // console.dir(`@@@ => zilch`)
    }
  }
}
