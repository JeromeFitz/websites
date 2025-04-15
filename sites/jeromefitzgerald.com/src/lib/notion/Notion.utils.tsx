import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { blocks as blocksDefault } from '@/lib/notion/config.default'
import { cx } from '@/utils/cx'

function getAnnotations(annotations: any) {
  if (!annotations) return ''
  const { bold, code, color, italic, strikethrough, underline } = annotations
  return cx(
    code && 'font-mono',
    italic && 'italic',
    bold && 'font-bold',
    strikethrough && 'line-through',
    underline && 'underline',
    color === 'default' ? '' : `notion-${color}`,
    '',
  )
}

function getBlock({
  block,
  blocks,
  order = 0,
}: {
  block: BlockObjectResponse
  blocks?: any
  order?: number
}) {
  if (!block.type) return null

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blockProps = { ...blocksDefault[block.type], ...blocks[block.type] }
  if (!blockProps) {
    console.dir(`>> unsupported: ${block.type} (${block.id})`)
    // console.dir(block)
    return null
  }

  const { component: Component, ...componentProps } = blockProps
  if (!Component || Component === undefined) return null

  const key = `${block.id}--${order}`
  // console.dir(`(getBlock) key: ${key}`)

  const props = { block, order: order, ...componentProps, blocks }
  // console.dir(`props:`)
  // console.dir(props)

  return <Component key={key} {...props} />
}

function getBlockKey(id: any, type: any, order: any) {
  return `${id}--${type}--${order}`
}

export { getAnnotations, getBlock, getBlockKey }
