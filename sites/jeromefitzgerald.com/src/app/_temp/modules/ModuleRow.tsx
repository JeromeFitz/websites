import { cx } from '@jeromefitz/ds/utils/cx'

function ModuleRow({ children, className = '' }) {
  return (
    <div
      className={cx(
        '[--row-gap:20px] [--cl:1] [--mbm-row:-3rem] [--ptd-row:5rem] [--ptm-row:5rem]',
        '[--gap:var(--row-gap,var(--grid-gap))_var(--grid-gap)] [--pl:var(--grid-margin)] [--pr:var(--grid-margin)] [--template-columns:1fr] ',
        'flex grid-cols-[var(--template-columns)] flex-wrap gap-[var(--gap)] pl-[var(--pl)] pr-[var(--pr)]',
        'md:grid md:[--gap:var(--grid-gap)] md:[--pr:var(--sidebar-width)] md:[--template-columns:repeat(var(--cl),1fr)]',
        'mb-[var(--mbm-row)] mt-[var(--mtm-row)] pb-[var(--pbm-row)] pt-[var(--ptm-row)]',
        'md:mb-[var(--mbd-row)] md:mt-[var(--mtd-row)] md:pb-[var(--pbd-row)] md:pt-[var(--ptd-row)]',
        'w-full',
        '',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { ModuleRow }
