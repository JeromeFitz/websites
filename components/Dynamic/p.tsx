import cx from 'clsx'
import React from 'react'

export interface Props {
  children: any
  props: any
}

const P = ({ children, props }: Props) => {
  return (
    <p className={cx('my-4 text-base md:text-lg flex flex-row')} {...props}>
      {children}
    </p>
  )
}

export default P
