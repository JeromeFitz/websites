import cx from 'clsx'
import nodeEmoji from 'node-emoji'

const EmojiHtml = ({ emoji, label, margin }) => {
  return (
    <span
      aria-label={label}
      // @hack(emoji) this breaks the underline on links
      className={cx('not-italic', margin && 'mr-1.5')}
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
    </span>
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
