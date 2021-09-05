import cx from 'clsx'
import nodeEmoji from 'node-emoji'

import { EMOJI_FALLBACK } from '~lib/constants'

const Emoji = ({ character, margin = false }) => {
  // @hack(emoji) emojis that are made up of more than one not supported yet
  const emojiTemp = !!character && character.length > 3 ? EMOJI_FALLBACK : character
  const emojiFound = nodeEmoji.find(emojiTemp)

  if (emojiFound === undefined) {
    return null
  }

  const { emoji, key } = emojiFound
  const label = key.replace(/_/gi, ' ')

  return (
    <span
      aria-label={label}
      // @hack(emoji) this breaks the underline on links
      className={cx('not-italic z-10', margin && 'mr-1.5')}
      role="img"
      style={{
        WebkitBackgroundClip: 'text',
        // @note(WebkitTextFillColor) any color will break out of transparency
        WebkitTextFillColor: 'yellow',
      }}
    >
      {emoji}
      {/* @hack(emoji) force two spaces */}
      {` `}
      {` `}
    </span>
  )
}

export default Emoji
