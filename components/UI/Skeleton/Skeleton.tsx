import cx from 'clsx'
import React, { CSSProperties } from 'react'

import px from '~utils/toPixels'

import styles from './Skeleton.module.css'

interface Props {
  width?: string | number
  height?: string | number
  boxHeight?: string | number
  style?: CSSProperties
  show?: boolean
  block?: boolean
  className?: string
}

const Skeleton: React.FC<Props> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height,
}) => {
  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  const shouldAutoSize = !!children && !(width || height)

  // Defaults
  width = width || 24
  height = height || 24
  boxHeight = boxHeight || height

  return (
    <span
      className={cx(styles.skeleton, className, {
        [styles.show]: show,
        [styles.wrapper]: shouldAutoSize,
        [styles.loaded]: !shouldAutoSize && !!children,
      })}
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: px(width),
              minHeight: px(height),
              marginBottom: `calc(${px(boxHeight)} - ${px(height)})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  )
}

export default Skeleton
