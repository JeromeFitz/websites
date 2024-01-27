import type { ComponentProps, ForwardRefRenderFunction } from 'react'

// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'
import { forwardRef } from 'react'

import type { Variant } from './Button.types'

import { cx } from '../../utils/cx'
import { VARIANTS } from './Button.constants'
import { commonStyles, variantStyles } from './Button.styles'

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant
}

const ButtonLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonLinkProps
> = (props, ref) => {
  const { className, href, variant = VARIANTS.DEFAULT, ...rest } = props
  const finalClassName =
    variant === VARIANTS.EMPTY
      ? cx(variantStyles[variant], className)
      : cx(commonStyles, variantStyles[variant], className)
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const useLink = href && href.toString().startsWith('/')

  if (useLink) {
    return (
      <Link className={finalClassName} href={href} ref={ref} role="link" {...rest} />
    )
  }

  return (
    <a
      className={finalClassName}
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      href={href.toString()}
      ref={ref}
      rel="noreferrer"
      role="link"
      target={'_blank'}
      {...rest}
    />
  )
}

const ButtonLink = forwardRef(ButtonLinkComponent)

export { ButtonLink }
