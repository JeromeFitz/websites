import cx from 'clsx'
import React from 'react'

export interface Props {
  children: any
}

const Span = ({ children, ...props }: Props) => {
  return (
    <span
      className={cx(
        'my-2 inline-flex flex-wrap',
        'text-base md:text-lg',
        'inline-p'
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Span
