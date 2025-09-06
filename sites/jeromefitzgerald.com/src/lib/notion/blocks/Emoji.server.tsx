import emojiRegex from 'emoji-regex'
import _map from 'lodash/map.js'
import _orderBy from 'lodash/orderBy.js'
import _size from 'lodash/size.js'
import { find as findEmoji } from 'node-emoji'

// @ts-ignore
function Emoji({ character }) {
  // const { find: findEmoji } = await import('node-emoji')
  const emojiFound = findEmoji(character)
  // console.dir(`[emoji] supported: ${character}`)

  if (emojiFound === undefined) {
    // console.dir(`[emoji] unsupported: ${character}`)
    return (
      <EmojiHtml
        emoji={character}
        label={'no generated description currently for this emoji'}
      />
    )
  }

  const { emoji, key } = emojiFound
  const label = `an emoji representation of ${key.replace(/_/gi, ' ')}`

  return <EmojiHtml emoji={emoji} label={label} />
}

/**
 * @note(a11y)
 *
 * Pass all strings of text to parse any emojis for a11y
 *
 * 1. NotionEmoji
 *    - Pass the `text` and prase through to see if `emoji` exists
 *    - For each `emoji` pass through the rest of the parser
 *    - For everything else, pass right back
 * 2. Emoji
 *    - If `emoji` found determine what it is and get info for display
 * 3. EmojiHtml
 *    - Display emoji
 *
 * Please Note:
 * - I prefer some visual space around Emojis, however,
 *  if we async/await all of this it becomes a layout shift
 *  so for now --- letting it go.
 *
 */
// @ts-ignore
function EmojiHtml({ emoji, label }) {
  return (
    <span aria-label={label} className="ml-0.5 mr-1.5" role="img">
      {emoji}
    </span>
  )
}

// @ts-ignore
// @todo(complexity) 13
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
function EmojiWrapper({ id, text }) {
  // const [loading, loadingSet] = useState(true)
  // useEffect(() => {
  //   loadingSet(false)
  // }, [])
  if (!text) return null
  // if (loading) return <>{text}</>

  // const { default: emojiRegex } = await import('emoji-regex')
  const regex = emojiRegex()
  // @todo(types)
  const emojiMapping: any = {}

  const _text = text
  // isDev && console.dir(`> lazy load emoji libraries`)

  let emojiIndex = 0
  // biome-ignore lint/correctness/noUnsafeOptionalChaining: migrate
  for (const match of text?.matchAll(regex)) {
    const emoji = match[0]
    // @note(emoji) double to take into account emoji codepoint length
    const emojiLength = [...emoji].length
    // console.dir(`___ debug`)
    // console.dir(`emojiLength: ${emojiLength}`)
    // console.dir(emoji)
    // console.dir(`_________`)
    // @hack(emoji) truly have no idea why 1️⃣️ needs to be 1.5
    const emojiLengthCodePoint =
      emojiLength === 3 ? emojiLength * 1.5 : emojiLength * 2
    if (emojiIndex === 0 && match.index !== 0) {
      emojiMapping[0] = {
        emoji: false,
        index: 0,
        text: text.slice(0, match.index),
        to: match.index,
        to2: match.index,
      }
      emojiIndex++
    }

    const prev = emojiMapping[emojiIndex - 1]
    if (!!prev && prev.index !== match.to) {
      emojiMapping[emojiIndex] = {
        emoji: false,
        index: prev.to,
        text: text.slice(prev.to, match.index),
        to: match.index,
        to2: match.index,
      }
      emojiIndex++
    }

    emojiMapping[emojiIndex] = {
      emoji: true,
      index: match.index,
      text: emoji,
      to: Math.floor(match?.index + emojiLengthCodePoint),
      to2: Math.floor(match?.index + emojiLength),
    }

    emojiIndex++
  }
  // @todo(types)
  const emojiMappingStitch: any[] = []
  if (_size(emojiMapping) > 0) {
    _map(_orderBy(emojiMapping, ['index'], ['asc']), (item: any, itemId) => {
      emojiMappingStitch.push(
        /**
         * @todo(types)
         * Argument of type 'any' is not assignable to parameter of type 'never'
         */

        // @ts-ignore
        item.emoji ? (
          /**
           * @note(next) outside of page.tsx, need to ignore
           * 'Emoji' cannot be used as a JSX component.
           */

          // @ts-ignore
          <Emoji character={item.text.trim()} key={`${id}--emoji--${itemId}`} />
        ) : (
          item.text
        ),
      )
      if (
        _size(emojiMapping) === _size(emojiMappingStitch) &&
        item.to < [...text].length
      ) {
        // console.dir(`---`)
        // console.dir(`slice time:`)
        // console.dir(item)
        // console.dir(`---`)

        const sliced = _text
          .slice(item.to2 + 1)
          .normalize('NFD')
          // @hack(emoji) replace any non-alphanumeric, replace with space
          // ref: https://ricardometring.com/javascript-replace-special-characters
          .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ')

        /**
         * @todo(types)
         * Argument of type 'any' is not assignable to parameter of type 'never'
         */

        // @ts-ignore
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

export { EmojiWrapper }
export default EmojiWrapper
