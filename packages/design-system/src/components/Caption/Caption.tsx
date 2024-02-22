import { CalloutIcon, CalloutRoot, CalloutText } from '@radix-ui/themes'

import { cx } from '../../utils/cx'
import { CameraIcon } from '../Icon/index'

interface CaptionProps {
  children?: any
  className?: string
  classNameText?: string
  icon?: any
}

function Caption({
  children,
  className = '',
  classNameText = '',
  icon: Icon = CameraIcon,
}: CaptionProps) {
  return (
    <CalloutRoot className={cx('w-full font-mono', className)} size="2">
      <CalloutIcon>
        <Icon />
      </CalloutIcon>
      <CalloutText className={classNameText}>{children}</CalloutText>
    </CalloutRoot>
  )
}

export { Caption }
