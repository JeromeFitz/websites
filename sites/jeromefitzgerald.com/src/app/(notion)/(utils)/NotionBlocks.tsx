import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { lazy, Suspense } from 'react'

import type { BlockObjectResponseCustom } from './Notion.types'

const OBJECTS = { LIST: 'list' }
const TYPES = { BLOCK: 'block', CHILD_PAGE: 'child_page' }

/**
 * @note(react) do not think this actually helps anything to be honest
 *              same with Suspense over 10 Blocks :/
 */
const NOTION_TO_REACT_MAP = {
  bulleted_list: lazy(() => import('./blocks/ListBulleted')),
  callout: lazy(() => import('./blocks/Callout')),
  column_list: lazy(() => import('./blocks/ColumnList')),
  divider: lazy(() => import('./blocks/Divider')),
  embed: lazy(() => import('./blocks/Embed')),
  heading_1: lazy(() => import('./blocks/Heading1')),
  heading_2: lazy(() => import('./blocks/Heading2')),
  heading_3: lazy(() => import('./blocks/Heading3')),
  image: lazy(() => import('./blocks/Image')),
  numbered_list: lazy(() => import('./blocks/ListNumbered')),
  paragraph: lazy(() => import('./blocks/Paragraph')),
  quote: lazy(() => import('./blocks/Quote')),
  video: lazy(() => import('./blocks/Video')),
}

function NotionBlocks({ data }: { data: ListBlockChildrenResponse }) {
  const { object, type, results } = data
  const isListBlock = object === OBJECTS.LIST && type === TYPES.BLOCK
  if (!isListBlock) {
    console.dir(`⚠️ Throw Error: NotionBlocks`)
    // console.dir(data)
    return null
  }

  return (
    <>
      {!!results &&
        results.map((block: BlockObjectResponseCustom, i) => {
          const Component = NOTION_TO_REACT_MAP[block.type]
          if (!Component) {
            console.dir(`>> unsupported: ${block.type} (${block.id})`)
            return null
          }
          if (i > 10) {
            return (
              // @todo(loading) suspense
              <Suspense key={`${block.id}-${i}`} fallback={<p>Loading...</p>}>
                <Component block={block} order={i} />
              </Suspense>
            )
          }
          return <Component key={block.id} block={block} order={i} />
        })}
    </>
  )
}

export { NotionBlocks }
