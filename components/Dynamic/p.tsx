import cx from 'clsx'
import React from 'react'

export interface Props {
  children: any
  props: any
}

const P = ({ children, props }: Props) => {
  return (
    <p
      className={cx(
        'my-2 inline-flex flex-wrap',
        'text-base md:text-lg',
        'inline-p'
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export default P
