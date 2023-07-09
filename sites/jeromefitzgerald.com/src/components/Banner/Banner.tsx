'use client'
import { CalendarIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import Headroom from 'react-headroom'

function Banner({}) {
  return (
    <Headroom>
      <div
        className={cx(
          // 'fixed',
          'top-0 z-20 m-0 min-h-[1.5rem] w-full shadow-lg transition-all duration-500',
          // 'bg-radix-slate2 hover:bg-radix-slate3',
          'text-white',
          'bg-radix-slate1 opacity-90 backdrop-blur-md hover:opacity-100',
          'bg-breeze',
          'dark:bg-breeze-r'
        )}
      >
        <NextLink
          className={cx('w-full cursor-pointer')}
          href="/events/2023/07/15/jerome-and?utm_source=website&utm_medium=banner&utm_id=20230715"
        >
          <div className={cx('mx-auto my-0 flex items-center justify-center')}>
            <p
              className={cx(
                'm-0 p-2 text-center tracking-wider',
                'flex flex-row gap-2 md:gap-3',
                'font-sans font-bold'
              )}
            >
              <span className="visible md:invisible md:hidden">Next Show:</span>
              <span className="invisible hidden md:visible md:inline-block">
                Jerome &: The Comedy Variety Show
              </span>
              <span className="inline-flex items-center justify-center gap-2">
                <CalendarIcon />
                {` `}
                SAT 07/15 09:00PM
              </span>
            </p>
          </div>
        </NextLink>
      </div>
    </Headroom>
  )
}

export { Banner }
