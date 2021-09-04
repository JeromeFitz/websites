import cx from 'clsx'

import AvatarFallback from './Avatar.fallback'
import { AvatarProps } from './Avatar.types'

const Avatar = ({ name = 'jerome' }: AvatarProps) => {
  return (
    <span className={cx('rounded inline pr-1.5')}>
      <AvatarFallback name={name.replace(/\s+/g, '')} />
    </span>
  )
}

export default Avatar
