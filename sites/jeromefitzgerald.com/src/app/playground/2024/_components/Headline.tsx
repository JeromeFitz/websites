import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

// import { Heading } from '@radix-ui/themes'

import type { As } from './Headline.types'

function HeadlineColumnA({ children, separateTitle = true }) {
  return (
    <div
      className={cx(
        'col-span-full lg:col-span-3',
        'flex flex-col justify-start',
        'h-fit',
        'lg:h-44 lg:max-h-56 lg:min-h-44',
        'lg:sticky lg:top-28',
        '',
      )}
    >
      <div className={cx('h-[inherit]', 'lg:h-full lg:max-h-56 lg:min-h-44')}>
        <div
          className={cx(
            'flex h-[inherit] flex-col gap-4 lg:gap-0',
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
        'lg:mr-3',
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
        'col-span-full lg:col-span-9',
        'mt-4 lg:mt-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { HeadlineColumnA, HeadlineContent, HeadlineTitle, HeadlineTitleSub }
