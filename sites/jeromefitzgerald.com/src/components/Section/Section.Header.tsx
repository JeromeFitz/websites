import { cx } from '@jeromefitz/shared/src/utils'

function SectionHeader({ children, className = '' }) {
  return (
    <>
      <div
        className={cx(
          'sticky z-0',
          'flex w-1/6 flex-col items-start py-4',
          // desktop
          'md:w-2/6 md:items-start',
          'md:py-2 md:pr-0.5',
          //
          // 'md:slate-border md:border-t-[1px] md:border-solid md:py-3'
          // before
          'before:h-[1px]',
          // 'before:h-0',
          'before:relative before:top-0 before:w-11/12 before:content-normal',
          // 'before:left-2 before:right-2,
          'before:bg-radix-slate6',
          '',
          // w/o react-headroom
          'top-0 md:top-2',
          // w/  react-headroom
          // 'top-4 md:top-8',
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export { SectionHeader }
