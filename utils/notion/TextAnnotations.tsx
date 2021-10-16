/* eslint-disable @typescript-eslint/restrict-plus-operands */
import cx from 'clsx'
import emojiRegex from 'emoji-regex'
// import hasEmoji from 'has-emoji'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useSound } from 'use-sound'

import Icon from '~components/Icon'
import { useUI } from '~context/ManagedUIContext'
import getNextLink from '~utils/notion/getNextLink'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

// const emojiParser2 = (text) => {
//   const emojiFound = hasEmoji(text.trim()) && text.trim().length <= 3
//   if (emojiFound === undefined || emojiFound === false) {
//     return text
//   }

//   return <Emoji character={text.trim()} />
// }

const emojiParser = (text) => {
  if (!text) return null
  const regex = emojiRegex()
  // const textLength = text.length
  const emojiMapping = {}
  const _text = text

  let emojiIndex = 0
  for (const match of text.matchAll(regex)) {
    const emoji = match[0]
    // @note(emoji) double to take into account emoji codepoint length
    const emojiLength = [...emoji].length
    // @hack(emoji) truly have no idea why 1️⃣️ needs to be 1.5
    const emojiLengthCodePoint =
      emojiLength === 3 ? emojiLength * 1.5 : emojiLength * 2
    if (emojiIndex === 0 && match.index !== 0) {
      emojiMapping[0] = {
        index: 0,
        to: match.index,
        to2: match.index,
        emoji: false,
        text: text.slice(0, match.index),
      }
      emojiIndex++
    }

    const prev = emojiMapping[emojiIndex - 1]
    if (!!prev && prev.index !== match.to) {
      emojiMapping[emojiIndex] = {
        index: prev.to,
        to: match.index,
        to2: match.index,
        emoji: false,
        text: text.slice(prev.to, match.index),
      }
      emojiIndex++
    }

    emojiMapping[emojiIndex] = {
      index: match.index,
      to: Math.floor(match.index + emojiLengthCodePoint),
      to2: Math.floor(match.index + emojiLength),
      emoji: true,
      text: emoji,
    }

    emojiIndex++
  }
  const emojiMappingStitch = []
  if (_size(emojiMapping) > 0) {
    _map(_orderBy(emojiMapping, ['index'], ['asc']), (item: any) => {
      emojiMappingStitch.push(
        item.emoji ? <Emoji character={item.text.trim()} /> : item.text
      )
      if (
        _size(emojiMapping) === _size(emojiMappingStitch) &&
        item.to < [...text].length
      ) {
        const sliced = _text
          .slice(item.to2 + 1)
          .normalize('NFD')
          // @hack(emoji) replace any non-alphanumeric, replace with space
          // ref: https://ricardometring.com/javascript-replace-special-characters
          .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ')
        emojiMappingStitch.push(sliced)
      }
    })
  }
  return (
    <>
      {_size(emojiMappingStitch) > 0
        ? _map(emojiMappingStitch, (ems) => ems)
        : _text}
    </>
  )
}

const TextAnnotationLink = ({ children, href }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const isExternal = !href.includes('jerome')

  if (!isExternal) {
    const link = getNextLink(href)
    if (!!link) {
      return (
        <NextLink as={link.as.replace('//', '/')} href={link.href}>
          <a
            className={cx(
              'font-semibold',
              'underline underline-offset-md underline-thickness-sm',
              'hover:text-green-500 dark:hover:text-yellow-200'
            )}
            onClick={() => {
              playActive()
            }}
          >
            {children}
          </a>
        </NextLink>
      )
    } else {
      return null
    }
  } else {
    return (
      <a
        className={cx(
          'font-semibold',
          'underline underline-offset-md underline-thickness-sm',
          'hover:text-green-500 dark:hover:text-yellow-200',
          'inline-flex flex-row',
          'ml-1'
        )}
        href={href}
        rel="noreferrer"
        target={'_blank'}
        onClick={() => {
          playActive()
        }}
      >
        <span>{children}</span>
        <Icon className="h-4 w-4 ml-1" icon={'ExternalLinkIcon'} />
      </a>
    )
  }
}

const TextAnnotation = ({ href, plain_text, annotations }) => {
  if (!plain_text) return null
  const text = emojiParser(plain_text)
  const { bold, code, color, italic, strikethrough, underline } = annotations
  return (
    <span
      className={[
        bold ? 'font-bold ' : '',
        code ? 'code ' : '',
        italic ? 'italic' : '',
        strikethrough ? 'line-through ' : '',
        underline ? 'underline ' : '',
      ].join('')}
      style={color !== 'default' ? { color } : {}}
    >
      {href ? <TextAnnotationLink href={href}>{text}</TextAnnotationLink> : text}
    </span>
  )
}

// const TextAnnotations = ({ href, plain_text, annotations }) => {
//   const { audio } = useUI()
//   const [playActive] = useSound('/static/audio/pop-down.mp3', {
//     soundEnabled: audio,
//     volume: 0.25,
//   })

//   let returnElement = <>{emojiParser(plain_text)}</>
//   if (annotations.bold) {
//     returnElement = <strong>{returnElement}</strong>
//   }
//   if (annotations.code) {
//     returnElement = <code>{returnElement}</code>
//   }
//   if (annotations.italic) {
//     returnElement = <em>{returnElement}</em>
//   }
//   if (annotations.strikethrough) {
//     returnElement = <s>{returnElement}</s>
//   }
//   if (annotations.underline) {
//     returnElement = <u>{returnElement}</u>
//   }
//   if (href) {
//     const isExternal = !href.includes('jerome')

//     if (!isExternal) {
//       const link = getNextLink(href)
//       if (!!link) {
//         returnElement = (
//           <NextLink as={link.as.replace('//', '/')} href={link.href}>
//             <a
//               className={cx(
//                 'font-semibold',
//                 'underline underline-offset-md underline-thickness-sm',
//                 'hover:text-green-500 dark:hover:text-yellow-200'
//               )}
//               onClick={() => {
//                 playActive()
//               }}
//             >
//               {returnElement}
//             </a>
//           </NextLink>
//         )
//       } else {
//         return null
//       }
//     } else {
//       returnElement = (
//         <a
//           className={cx(
//             'font-semibold',
//             'underline underline-offset-md underline-thickness-sm',
//             'hover:text-green-500 dark:hover:text-yellow-200',
//             'inline-flex flex-row',
//             'ml-1'
//           )}
//           href={href}
//           rel="noreferrer"
//           target={'_blank'}
//           onClick={() => {
//             playActive()
//           }}
//         >
//           <span>{returnElement}</span>
//           <Icon className="h-4 w-4 ml-1" icon={'ExternalLinkIcon'} />
//         </a>
//       )
//     }
//   }
//   return returnElement
// }

export { TextAnnotation }
// export default TextAnnotations
