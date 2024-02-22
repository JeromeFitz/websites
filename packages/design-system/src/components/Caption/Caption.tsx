import type { CalloutRootProps } from '@radix-ui/themes/dist/esm/components/callout.js'

import { CalloutIcon, CalloutRoot, CalloutText } from '@radix-ui/themes'

import { cx } from '../../utils/cx'
import { CameraIcon } from '../Icon'

interface CalloutRootPropsCustom extends CalloutRootProps {
  icon?: any
  textClassname?: string
}

function Caption({
  children,
  className,
  icon: Icon = CameraIcon,
  size = '2',
}: CalloutRootPropsCustom) {
  return (
    <CalloutRoot className={cx('w-full font-mono', className)} size={size}>
      <CalloutIcon>
        <Icon />
      </CalloutIcon>
      <CalloutText>{children}</CalloutText>
    </CalloutRoot>
  )
}

export { Caption }
