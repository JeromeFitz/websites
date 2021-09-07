import cx from 'clsx'
import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from 'react'

import s from './Text.module.css'

interface Props {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
}

type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading'

const Text: FunctionComponent<Props> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={cx(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Text
