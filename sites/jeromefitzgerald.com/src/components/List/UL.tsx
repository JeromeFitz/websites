import { cx } from '@jeromefitz/ds/utils/cx'

function UL({ children, className = '' }) {
  return <ul className={cx('flex  flex-col gap-4', className)}>{children}</ul>
}

export { UL }
