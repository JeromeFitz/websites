import cx from 'clsx'

import AvatarFallback from './Avatar.fallback'
import { AvatarProps } from './Avatar.types'

const Avatar = ({ margin = false, name = 'jerome' }: AvatarProps) => {
  return (
    <span className={cx('rounded inline z-10', margin ? 'pr-3' : 'pr-2')}>
      <AvatarFallback name={name.replace(/\s+/g, '')} />
    </span>
  )
}

export default Avatar
