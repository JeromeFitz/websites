import { cx } from '@jeromefitz/ds/utils/cx'

import { CornerBottomLeftIcon } from '@radix-ui/react-icons'

function LI({ children, className = '' }) {
  return (
    <li
      className={cx('flex list-none items-baseline justify-start gap-2', className)}
    >
      <CornerBottomLeftIcon />
      {children}
    </li>
  )
}

export { LI }
