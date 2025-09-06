import type {
  BulletedListItemBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import { Fragment, forwardRef } from 'react'

import { Anchor } from '@/components/Anchor/index'
import { cx } from '@/utils/cx'

import { getAnnotations, getBlockKey } from '../Notion.utils'
import { NotionEmoji as EmojiWrapper } from './Emoji'

type ApiColor =
  | 'blue'
  | 'blue_background'
  | 'brown'
  | 'brown_background'
  | 'default'
  | 'gray'
  | 'gray_background'
  | 'green'
  | 'green_background'
  | 'orange'
  | 'orange_background'
  | 'pink'
  | 'pink_background'
  | 'purple'
  | 'purple_background'
  | 'red'
  | 'red_background'
  | 'yellow'
  | 'yellow_background'

// @todo(types)
const Text = forwardRef(function Text(props: any, ref: any) {
  const { children } = props

  const Component = props?.as ?? 'p'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  return (
    <Component ref={ref} {...componentProps}>
      {children}
    </Component>
  )
})

// @ts-ignore
function Href({ children, href, ...props }) {
  return (
    <Anchor href={href} {...props}>
      {children}
    </Anchor>
  )
}

function RichText({
  block,
  order,
  ...props
}: {
  block:
    | any // @todo(types)
    | BulletedListItemBlockObjectResponse
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
    | NumberedListItemBlockObjectResponse
    | ParagraphBlockObjectResponse
    | QuoteBlockObjectResponse
  order: number
}) {
  const key = getBlockKey(block.id, block.type, order)
  const data: {
    color: ApiColor
    rich_text: RichTextItemResponse[]
  } = block[block.type]

  if (!data) return null

  const { rich_text } = data

  return (
    <Text key={key} {...props}>
      <RichTextArray id={block.id} items={rich_text} />
    </Text>
  )
}

// @ts-ignore
function RichTextArray({ id, items }) {
  // console.dir(`-- items --`)
  // console.dir(items)
  if (!items) return null
  return (
    <>
      {/* @ts-ignore */}
      {items.map((item: RichTextItemResponse, _i) => {
        const key = getBlockKey(id, 'rich_text', _i)
        const { annotations, href, plain_text } = item
        const props: any = {
          className: cx(getAnnotations(annotations)),
        }

        const isInternalToNotion = !!href && !href?.includes('http')
        if (!!href && !isInternalToNotion) {
          return (
            <Href href={href} key={key} {...props}>
              {plain_text}
            </Href>
          )
        }

        const Component = props.className ? 'span' : Fragment
        if (Component === Fragment) delete props.className

        return (
          <Component key={key} {...props}>
            <EmojiWrapper id={id} text={plain_text} />
            {/* {plain_text} */}
          </Component>
        )
      })}
    </>
  )
}

export { RichText }
export default RichText
