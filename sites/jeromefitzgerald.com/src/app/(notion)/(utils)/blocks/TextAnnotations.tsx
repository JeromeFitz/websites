import { cx } from '@jeromefitz/shared/src/utils'
import type {
  BlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

// import { PageObjectResponseCustom } from '../Notion.types'
// import { getPageData } from '../queries/index'

import { EmojiWrapper } from './Emoji'
import { Link } from './Link'

function TextAnnotations({ block }: { block: BlockObjectResponse }) {
  const key = `${block.id}-${block.type}`
  const { rich_text } = block[block.type]

  return (
    <>
      {}
      {/* eslint-disable-next-line @typescript-eslint/require-await */}
      {rich_text.map(async (rt: TextRichTextItemResponse, i) => {
        const { annotations, href, plain_text } = rt
        const { bold, code, color, italic, strikethrough, underline } = annotations
        const props = {
          className: cx(
            code && 'font-mono',
            italic && 'italic',
            bold && 'font-bold',
            strikethrough && 'line-through',
            underline && 'underline',
            color === 'default' ? '' : `notion-${color}`,
            'break-words',
            ''
          ),
          // href: '',
          plain_text,
        }

        const isInternalToNotion = !!href && !href?.includes('http')

        if (!!href && !isInternalToNotion) {
          props['href'] = href
          // @note(next) technically we are setting it right before...
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return <Link key={`${key}-${i}`} {...props} />
        }

        /**
         * @todo(notion) think this is broke because of a reworking of
         *  getPropertyTypeData --> to the outcome of it being passed
         */
        // if (isInternalToNotion) {
        //   const data: PageObjectResponseCustom = await getPageData(
        //     href.replace('/', '')
        //   )
        //   if (!data) return null
        //   if (!data?.properties)
        //     return (
        //       <span key={`${key}-${i}`} {...props}>
        //         <EmojiWrapper id={block.id} text={plain_text} />
        //       </span>
        //     )
        //   props['href'] =
        //     data?.properties['Slug.Preview']?.formula[
        //       data?.properties['Slug.Preview']?.formula?.type
        //     ]
        //   // @note(next) technically we are setting it right before...
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   return <Link key={`${key}-${i}`} {...props} />
        // }

        return (
          <span key={`${key}-${i}`} {...props}>
            <EmojiWrapper id={block.id} text={plain_text} />
          </span>
        )
      })}
    </>
  )
}

export { TextAnnotations }
export default TextAnnotations
