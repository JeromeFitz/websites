import cx from 'clsx'
import { FC, ReactNode, Component } from 'react'

import styles from './Grid.module.css'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  variant?: 'default' | 'filled'
}

const Grid: FC<Props> = ({
  className,
  layout = 'A',
  children,
  variant = 'default',
}) => {
  const rootClassName = cx(
    styles.root,
    {
      [styles.layoutA]: layout === 'A',
      [styles.layoutB]: layout === 'B',
      [styles.layoutC]: layout === 'C',
      [styles.layoutD]: layout === 'D',
      [styles.layoutNormal]: layout === 'normal',
      [styles.default]: variant === 'default',
      [styles.filled]: variant === 'filled',
    },
    className
  )
  return <div className={rootClassName}>{children}</div>
}

export default Grid
