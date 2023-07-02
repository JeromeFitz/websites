import { cx } from '@jeromefitz/shared/src/utils'

import { CONTENT_NODE_TYPES, getContentNode } from '../index'

// const EmojiParser = dynamic(
//   () =>
//     import('@jeromefitz/design-system/custom/Emoji').then(
//       (mod: any) => mod.EmojiParser
//     ),
//   {
//     ssr: true,
//   }
// )

const TextAnnotations = ({ href, id, plain_text, annotations }) => {
  if (!plain_text) return null
  // @types(emoji) dynamic import ability
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const text = <EmojiParser id={id} text={plain_text} />
  const text = plain_text
  const { bold, code, color, italic, strikethrough, underline } = annotations

  if (!!href) {
    const ContentNode = getContentNode[CONTENT_NODE_TYPES.LINK]
    const props = {
      href,
      id,
      plain_text,
      annotations,
    }
    return <ContentNode key={id} {...props} />
  }

  // if (!!code) {
  //   // const ContentNode = getContentNode[CONTENT_NODE_TYPES.CODE]
  //   // const props = {
  //   //   href,
  //   //   id,
  //   //   plain_text,
  //   //   annotations,
  //   // }
  //   console.dir(`!! code`)
  //   // console.dir(props)
  //   // return <ContentNode key={id} {...props} />
  //   return (
  //     <code
  //       className={cx(
  //         italic && 'italic',
  //         bold && 'font-bold',
  //         strikethrough && 'line-through',
  //         underline && 'underline',
  //         color !== 'default' && `text-[${color}]`,
  //         ''
  //       )}
  //     >
  //       {text}
  //     </code>
  //   )
  // }

  return (
    <span
      className={cx(
        code && 'font-mono',
        italic && 'italic',
        bold && 'font-bold',
        strikethrough && 'line-through',
        underline && 'underline',
        color !== 'default' && `text-[${color}]`,
        'break-words',
        ''
      )}
    >
      {text}
    </span>
  )
}

export default TextAnnotations
