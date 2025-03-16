import { cx } from '@jeromefitz/ds/utils/cx'

import { CaretRightIcon } from '@radix-ui/react-icons'

function NavigationSeparator({ className, isActive = true, order = 0 }) {
  if (!isActive) return null
  return (
    <div
      className={cx(
        'relative -left-1 flex h-full w-3 flex-none items-center',
        className,
      )}
      style={{ opacity: 0.4, order }}
    >
      <div className={cx('contents h-[inherit] w-[inherit]')}>
        <CaretRightIcon
          className={cx('relative inline-flex aspect-[1_/_1] overflow-visible')}
        />
      </div>
    </div>
  )
}

export { NavigationSeparator }
