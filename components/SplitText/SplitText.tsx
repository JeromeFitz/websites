import cx from 'clsx'

import styles from './SplitText.module.css'

const MAX_ID = 30

const SplitText = ({
  className = null,
  idPrefix = 'split',
  speed = 5,
  text,
  transition = true,
}) => {
  if (!text) return null

  const split = text.split('')

  return split.map((letter, index) => {
    const cssProperties = {}
    cssProperties[`--${idPrefix}-id`] = index > MAX_ID ? MAX_ID : index
    const transitionSpeed = `ngop-t-${speed}`
    return (
      <span
        aria-hidden={true}
        className={cx(
          idPrefix,
          className,
          transition ? styles[transitionSpeed] : styles['ngop-t-sd']
        )}
        style={cssProperties}
      >
        {letter}
      </span>
    )
  })
}

export default SplitText
