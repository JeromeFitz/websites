import type { CalloutRootProps } from '@radix-ui/themes/dist/esm/components/callout.js'
import type { ReactNode } from 'react'

import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
} from '@radix-ui/themes/dist/esm/components/callout.js'

import { cx } from '../../utils/cx'
import { FileTextIcon } from '../Icon/index'

type AdditionalProps = {
  children?: ReactNode
  className?: string
  classNameText?: string
  color?: string
  icon?: any
}
type CalloutRootPropsImpl = CalloutRootProps & AdditionalProps

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
