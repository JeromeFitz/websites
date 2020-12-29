import cx from 'clsx'
import React from 'react'

export interface Props {
  children: any
  props: any
}

const P = ({ children, props }: Props) => {
  return (
    <p
      className={cx('text-black dark:text-white my-4 text-md md:text-lg')}
      {...props}
    >
      {children}
    </p>
  )
}

export default P
