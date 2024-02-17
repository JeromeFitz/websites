import { cx } from '@jeromefitz/ds/utils/cx'

function ModuleColumn({ children, className = '', refPass = null }) {
  const ref = refPass
  return (
    <div
      className={cx(
        'flex flex-col items-start justify-start gap-[1.5rem_var(--grid-gap)]',
        'w-full',
        // 'bg-radix-yellow8',
        // 'z-30',
        '',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  )
}

export { ModuleColumn }
