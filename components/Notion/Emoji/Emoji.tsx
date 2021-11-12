import nodeEmoji from 'node-emoji'

import { Text } from '~styles/system/components'

const EmojiHtml = ({ emoji, label, margin }) => {
  return (
    <Text
      as="span"
      aria-label={label}
      // @hack(emoji) this breaks the underline on links
      css={{
        fontStyle: 'normal',
        mr: margin ? '$1' : '0',
      }}
      role="img"
      style={{
        WebkitBackgroundClip: 'text',
        // @note(WebkitTextFillColor) any color will break out of transparency
        WebkitTextFillColor: 'inherit',
      }}
    >
      {emoji}
      {/* @hack(emoji) force two spaces */}
      {` `}
      {` `}
    </Text>
  )
}

const Emoji = ({ character, margin = false }) => {
  const emojiFound = nodeEmoji.find(character)

  if (emojiFound === undefined) {
    return (
      <EmojiHtml emoji={character} label={'emoji unsupported'} margin={margin} />
    )
  }

  const { emoji, key } = emojiFound
  const label = `emoji ${key.replace(/_/gi, ' ')}`

  return <EmojiHtml emoji={emoji} label={label} margin={margin} />
}

export default Emoji
