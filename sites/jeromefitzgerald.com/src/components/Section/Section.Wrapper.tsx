import { cx } from '@/utils/cx'

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={cx('z-0 w-full')}>
      <div
        className={cx(
          'flex w-full flex-row flex-wrap items-start pt-8',
          'md:flex-row md:pt-4',
          'before:h-0',
          'before:relative before:inset-x-2 before:top-0 before:w-full before:content-normal',
          'before:bg-gray-8',
          '',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { SectionWrapper }
