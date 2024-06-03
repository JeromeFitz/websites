import { cx } from '@jeromefitz/ds/utils/cx'

function OL({ children, className = '' }) {
  return <ol className={cx('flex flex-col gap-4', className)}>{children}</ol>
}

export { OL }
