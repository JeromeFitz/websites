import type { RootProps as CalloutRootProps } from '@radix-ui/themes/dist/esm/components/callout.js'
import type { ReactNode } from 'react'

import {
  Icon as CalloutIcon,
  Root as CalloutRoot,
  Text as CalloutText,
} from '@radix-ui/themes/dist/esm/components/callout.js'

import { FileTextIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

interface AdditionalProps {
  children?: ReactNode
  className?: string
  classNameText?: string
  color?: string
  icon?: any
}
type CalloutRootPropsImpl = AdditionalProps & CalloutRootProps

function CalloutImpl({
  children = <>This page is in the process of being updated.</>,
  className = '',
  classNameText = '',
  color = 'pink',
  icon: Icon = FileTextIcon,
  size = '2',
  variant = 'soft',
}: CalloutRootPropsImpl) {
  return (
    <CalloutRoot
      className={cx('w-full font-mono', className)}
      color={color}
      size={size}
      variant={variant}
    >
      <CalloutIcon>
        <Icon />
      </CalloutIcon>
      <CalloutText className={classNameText}>{children}</CalloutText>
    </CalloutRoot>
  )
}

export { CalloutImpl as Callout }
