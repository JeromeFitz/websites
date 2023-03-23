import { SVGAttributes } from 'react'

/**
 * ref: https://github.com/radix-ui/icons/blob/master/packages/radix-icons/src/types.tsx
 */
interface IconProps extends SVGAttributes<SVGElement> {
  children?: never
  style?: any
  color?: string
  label?: string
}

export type { IconProps }
