'use client'
import { CalendarIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import Headroom from 'react-headroom'

/**
 * @hack
 * Until next version is updated, do some fun hacks
 */
const info = {
  title: 'Jerome &: Else Collective, Derek Minto, ...',
  url: '/events/2023/12/16/jerome-and?utm_source=website&utm_medium=banner&utm_id=20231216',
  subtitle: 'SAT 12/16 09:00PM',
}

function Loading({}) {
  return (
    <span className="relative top-[0.125rem] inline-block w-6/12 max-w-sm animate-pulse rounded-md">
      <span
        className={`inline-block h-full w-full rounded bg-white text-xs font-normal leading-6 tracking-tight md:text-sm`}
      >
        &nbsp;
      </span>
    </span>
  )
}

function Banner({}) {
  /**
   * @todo(notion) dynamically get next event
   */
  const isLoading = false

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
        <NextLink className={cx('w-full cursor-pointer')} href={info.url}>
          <div
            className={cx('mx-auto my-0 flex w-full  items-center justify-center')}
          >
            <p
              className={cx(
                'm-0 p-2 text-center tracking-wider',
                'flex flex-row gap-2 md:gap-3',
                'font-sans font-bold',
                'w-full items-center',
                'ml-3 justify-evenly md:ml-0',
                'text-sm'
              )}
            >
              <span className="visible inline-flex w-4/12 items-center justify-center gap-2 md:invisible md:hidden">
                <>
                  <CalendarIcon />
                  {` `} Next Show:
                </>
              </span>
              <span className="mr-1 inline-flex w-8/12 items-center justify-end gap-2 md:invisible md:hidden md:w-6/12 md:justify-start">
                {isLoading ? <Loading /> : `${info.subtitle}`}
              </span>
              <span className="invisible hidden items-center justify-center gap-2 text-right md:visible md:inline-flex md:w-full">
                <CalendarIcon />
                {` `}
                {isLoading ? <Loading /> : `${info.title} => ${info.subtitle}`}
              </span>
            </p>
          </div>
        </NextLink>
      </div>
    </Headroom>
  )
}

export { Banner }
