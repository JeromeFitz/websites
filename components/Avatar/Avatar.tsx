import cx from 'clsx'

import AvatarFallback from './Avatar.fallback'
import { AvatarProps } from './Avatar.types'

const Avatar = ({ margin = false, name = 'jerome' }: AvatarProps) => {
  return (
    <span className={cx('rounded inline z-10', margin ? 'pl-4 pr-2' : 'pr-2')}>
      <AvatarFallback name={name.replace(/[^0-9a-z]/gi, '')} margin={margin} />
    </span>
  )
}

export default Avatar
