import cx from 'clsx'

import styles from './SplitText.module.css'

const MAX_ID = 30

const SplitText = ({
  className = null,
  idPrefix = 'split',
  text,
  transition = true,
}) => {
  if (!text) return null

  const split = text.split('')

  return split.map((letter, index) => {
    const cssProperties = {}
    cssProperties[`--${idPrefix}-id`] = index > MAX_ID ? MAX_ID : index
    return (
      <span
        aria-hidden={true}
        className={cx(
          idPrefix,
          className,
          transition ? styles.transition : styles['transition-slight-delay']
        )}
        style={cssProperties}
      >
        {letter}
      </span>
    )
  })
}

export default SplitText
