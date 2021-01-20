import cx from 'clsx'
import React, { FC } from 'react'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<Props> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cx(className, {
    'mx-auto max-w-8xl px-6': !clean,
  })

  const Component: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  > = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
