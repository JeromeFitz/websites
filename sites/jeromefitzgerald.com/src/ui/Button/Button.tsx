import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react'

import { cx } from '~utils/cx'

import { commonStyles, variantStyles } from './Button.styles'
import type { Variant } from './Button.types'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref
) => {
  const { className, variant = 'default', ...rest } = props
  const finalClassName = cx(commonStyles, variantStyles[variant], className)
  return <button className={finalClassName} ref={ref} {...rest} />
}

export const Button = forwardRef(ButtonComponent)
