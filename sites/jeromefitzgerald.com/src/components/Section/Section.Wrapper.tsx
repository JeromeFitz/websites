import { cx } from '@jeromefitz/shared/src/utils'

function SectionWrapper({ children }) {
  return (
    <div className={cx('z-0 w-full transition-all duration-100 ease-in')}>
      <div
        className={cx(
          'flex w-full flex-wrap items-start pt-1 md:pt-4',
          // custom
          // 'relative',
          '',
          // before
          // 'before:h-[1px]',
          'before:h-0',
          'before:relative before:inset-x-2 before:top-0 before:w-full before:content-normal',
          'before:bg-radix-green8',
          ''
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { SectionWrapper }
