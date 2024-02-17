import { cx } from '@jeromefitz/ds/utils/cx'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('animate-pulse rounded-md bg-[var(--accent-5)]', className)}
      {...props}
    />
  )
}

export { Skeleton }
