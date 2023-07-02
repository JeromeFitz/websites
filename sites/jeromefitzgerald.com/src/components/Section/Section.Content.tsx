import { cx } from '@jeromefitz/shared/src/utils'

function SectionContent({ children, className = '' }) {
  return (
    <div
      className={cx(
        // 'sticky',
        'top-0 flex w-5/6 flex-col items-start py-4',
        // desktop
        'md:top-2 md:w-4/6 md:items-start',
        'md:py-2',
        //
        // 'md:slate-border md:border-t-[1px] md:border-solid md:py-3'
        // before
        'before:h-[1px]',
        // 'before:h-0',
        'before:relative before:top-0 before:w-full  before:content-normal',
        // 'before:left-2 before:right-2,
        'before:bg-radix-slate6',
        '',
        className
      )}
    >
      <div
        className={cx('mx-auto md:mx-0', 'my-1 py-1', 'md:my-2 md:py-2', 'w-full')}
      >
        {children}
      </div>
    </div>
  )
}

export { SectionContent }
