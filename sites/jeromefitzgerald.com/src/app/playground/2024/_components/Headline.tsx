import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

// import { Heading } from '@radix-ui/themes'

import type { As } from './Headline.types'

function HeadlineColumnA({ children, separateTitle = true }) {
  return (
    <div
      className={cx(
        'col-span-4 md:col-span-1',
        'flex flex-col justify-start',
        'h-fit',
        'md:h-44 md:max-h-56 md:min-h-44',
        'md:sticky md:top-28',
        '',
      )}
    >
      <div className={cx('h-[inherit]', 'md:h-full md:max-h-56 md:min-h-44')}>
        <div
          className={cx(
            'flex h-[inherit] flex-col gap-4 md:gap-0',
            separateTitle && 'justify-between',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type HeadlineTitleProps = {
  as?: As
  children: ReactNode
  className?: string
}
function HeadlineTitle({
  as = 'p',
  children,
  className,
  ...props
}: HeadlineTitleProps) {
  const Component: As = as
  return (
    <Component
      className={cx(
        'text-4xl font-black tracking-tighter',
        'line-clamp-3',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type HeadlineTitleSubProps = {
  children: ReactNode
  className?: string
}
function HeadlineTitleSub({ children, className }: HeadlineTitleSubProps) {
  return (
    <div
      className={cx(
        'font-mono text-base font-light tracking-normal',
        'flex flex-row flex-wrap gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}
function HeadlineContent({ children, className = '' }) {
  return (
    <div
      className={cx(
        'flex flex-col gap-4',
        'col-span-4 md:col-span-3',
        'mt-4 md:mt-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { HeadlineColumnA, HeadlineContent, HeadlineTitle, HeadlineTitleSub }
