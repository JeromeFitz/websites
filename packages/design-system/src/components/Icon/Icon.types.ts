import { SVGAttributes } from 'react'

/**
 * ref: https://github.com/radix-ui/icons/blob/master/packages/radix-icons/src/types.tsx
 */
interface IconProps extends SVGAttributes<SVGElement> {
  children?: never
  color?: string
  label?: string
  style?: any
}

export type { IconProps }
