import cx from 'clsx'
import _last from 'lodash/last'

import styles from './SplitText.module.css'

const MAX_ID = 30

const SplitText = ({
  className = null,
  idPrefix = 'split',
  speed = 5,
  text,
  transition = true,
  splitBy = 'word',
}) => {
  if (!text || typeof text === 'object') return null
  const isWord = splitBy === 'word'

  const words = text.split(isWord ? ' ' : '')
  const isLast = _last(words)

  return words.map((word, wordIndex) => {
    const transitionSpeed = `ngop-t-${speed}`

    const cssProperties = {}
    cssProperties[`--${idPrefix}-id`] = isWord
      ? wordIndex * 4
      : wordIndex > MAX_ID
      ? MAX_ID
      : wordIndex

    return (
      <span
        aria-hidden={true}
        className={cx(
          idPrefix,
          className,
          transition ? styles[transitionSpeed] : styles['ngop-t-sd']
        )}
        key={`text-span--${text}--${wordIndex}`}
        style={cssProperties}
      >
        {!isWord && (word === ' ' ? '\u00A0' : word)}
        {isWord &&
          (isLast === word
            ? word
            : // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              word + '\u00A0')}
      </span>
    )
  })

  // return split.map((letter, index) => {
  //   const cssProperties = {}
  //   cssProperties[`--${idPrefix}-id`] = index > MAX_ID ? MAX_ID : index
  //   const transitionSpeed = `ngop-t-${speed}`
  //   return (
  //     <span
  //       aria-hidden={true}
  //       className={cx(
  //         idPrefix,
  //         className,
  //         transition ? styles[transitionSpeed] : styles['ngop-t-sd']
  //       )}
  //       style={cssProperties}
  //     >
  //       {letter === ' ' ? '\u00A0' : letter}
  //     </span>
  //   )
  // })
}

export default SplitText
