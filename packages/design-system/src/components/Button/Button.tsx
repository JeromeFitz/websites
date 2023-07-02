import { cx } from '@jeromefitz/shared/src/utils'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react'

import { commonStyles, variantStyles } from './Button.styles'
import type { Classname, Variant } from './Button.types'
import { VARIANTS } from './Button.constants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: Classname
  variant?: Variant
}

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref
) => {
  const { className, variant = VARIANTS.DEFAULT, ...rest } = props
  const finalClassName =
    // // variant === VARIANTS.EMPTY
    // //   ? cx(variantStyles[variant], className)
    // //   : cx(commonStyles, variantStyles[variant], className)
    // cx(variant !== VARIANTS.EMPTY && commonStyles, variantStyles[variant], className)
    cx(commonStyles, variantStyles[variant], className)

  return <button className={finalClassName} ref={ref} {...rest} />
}

export const Button = forwardRef(ButtonComponent)
