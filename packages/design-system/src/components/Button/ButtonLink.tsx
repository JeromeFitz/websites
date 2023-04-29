 
import Link from 'next/link'
import { forwardRef } from 'react'
import type { ComponentProps, ForwardRefRenderFunction } from 'react'

import { cx } from '../../utils/cx'

import { commonStyles, variantStyles } from './Button.styles'
import type { Variant } from './Button.types'
import { VARIANTS } from './Button.vars'

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant
}

const ButtonLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonLinkProps
> = (props, ref) => {
  const { className, variant = VARIANTS.DEFAULT, ...rest } = props
  const finalClassName =
    variant === VARIANTS.EMPTY
      ? cx(variantStyles[variant], className)
      : cx(commonStyles, variantStyles[variant], className)
  return <Link className={finalClassName} ref={ref} role="link" {...rest} />
}

export const ButtonLink = forwardRef(ButtonLinkComponent)
