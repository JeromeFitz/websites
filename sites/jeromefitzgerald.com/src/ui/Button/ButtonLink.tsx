// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'
import { forwardRef } from 'react'
import type { ComponentProps, ForwardRefRenderFunction } from 'react'

import { cx } from '~utils/cx'

import { commonStyles, variantStyles } from './Button.styles'
import type { Variant } from './Button.types'

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant
}

const ButtonLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonLinkProps
> = (props, ref) => {
  const { className, variant = 'default', ...rest } = props
  const finalClassName = cx(commonStyles, variantStyles[variant], className)
  return <Link className={finalClassName} ref={ref} role="link" {...rest} />
}

export const ButtonLink = forwardRef(ButtonLinkComponent)
