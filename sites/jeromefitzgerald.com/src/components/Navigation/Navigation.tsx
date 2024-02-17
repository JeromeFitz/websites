// 'use client'
import { CalendarIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
// import { useScroll, useMotionValueEvent } from 'framer-motion'
/* eslint-disable no-restricted-imports */
import NextLink from 'next/link'
// import { useState } from 'react'

const buttonStyles = cx(
  // @todo(radix-ui) get these custom classes back
  // 'pink-button-cta',
  'rounded px-3 py-2 text-sm font-bold',
  'transition-all duration-300 ease-in-out',
  'flex flex-row items-center justify-center gap-2 shadow-md',
  // 'pointer-events-auto',
  '',
)
const colors = ['red', 'orange', 'blue', 'green']
const menus = [
  {
    href: '/',
    id: 'pages',
    items: [
      { href: '/about', id: '/about', title: 'About' },
      { href: '/contact', id: '/contact', title: 'Contact' },
    ],
    title: 'Pages',
  },
  {
    href: '/events',
    id: 'events',
    items: [
      {
        href: '/events/2023/08/04/your-act',
        id: '/events/2023/08/04/your-act',
        title: 'THU 08/04 Your Act',
      },
      {
        href: '/events/2023/08/19/jerome-and',
        id: '/events/2023/08/19/jerome-and',
        title: 'SAT 08/19 Jerome &',
      },
      { href: '/events', id: '/events/view-all', title: '… View All' },
    ],
    title: 'Events',
  },
  {
    href: '/shows',
    id: 'shows',
    items: [
      {
        href: '/shows/jerome-and',
        id: '/shows/jerome-and',
        title: 'Jerome &',
      },
      {
        href: '/shows/jfle',
        id: '/shows/jfle',
        title: 'JFLE',
      },
      {
        href: '/shows/the-playlist',
        id: '/shows/the-playlist',
        title: 'The Playlist',
      },
      { href: '/shows', id: '/shows/view-all', title: '… View All' },
    ],
    title: 'Shows',
  },
]

function Navigation({}) {
  const isDebug = false
  const isVisible = true

  // const [isVisible, isVisibleSet] = useState(true)
  // const [numLatest, numLatestSet] = useState(0)
  // const { scrollY } = useScroll()

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   // console.log('Page scroll: ', latest)
  //   latest > 20 ? isVisibleSet(false) : isVisibleSet(true)
  //   numLatestSet(latest)
  //   numLatest >= latest && isVisibleSet(true)
  // })

  return (
    <>
      {/* CTA SOlver */}
      <div
        className={cx('fixed left-0 top-0 z-[9995] w-full', 'pointer-events-none')}
        id="nav--desktop--cta-solver"
      >
        <div
          className={cx(
            'relative flex',
            'mx-4 my-1',
            isDebug && 'bg-[var(--accent-7)]',
          )}
          id="nav--desktop-wrapper"
        >
          <div className="md:w-9/12" />
          <div
            className={cx(
              'w-full md:w-3/12',
              'relative mx-4 mt-1 flex items-start justify-end',
              isDebug && 'bg-[var(--gray-11)]',

              '',
            )}
            id="nav--desktop-wrapper--cta-solver"
          >
            <NextLink
              className={cx(
                buttonStyles,
                'opacity-0 will-change-[opacity] hover:opacity-100',
                'pointer-events-auto ',
              )}
              href={`/events/2023/08/19/jerome-and`}
            >
              <CalendarIcon />
              <span>Jerome &: SAT 08/19 09PM</span>
            </NextLink>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <nav
        className={cx(
          'pointer-events-none fixed left-0 top-0 z-[9994] w-full',
          !isDebug && 'mix-blend-difference',
          isDebug && 'bg-radix-yellow11',
          '',
        )}
        id="nav--desktop"
      >
        <div
          className={cx(
            'relative flex',
            'mx-4 my-1',
            isDebug && 'bg-[var(--accent-7)]',
          )}
          id="nav--desktop-wrapper"
        >
          {/* Logotype */}
          <div
            className={cx(
              'pl-[1.125rem] pt-4 md:w-4/12',
              isDebug && 'bg-radix-green11',
            )}
            id="nav--desktop-wrapper--logo"
          >
            <NextLink
              className={cx(
                'invisible hidden',
                'pointer-events-auto ml-[-1px] mt-[-1px] text-xs font-bold uppercase',
              )}
              href="/"
            >
              Jerome
            </NextLink>
          </div>
          {/* Wrapper */}
          <div
            className={cx('md:w-8/12', isDebug && 'bg-radix-brown11')}
            id="nav--desktop-wrapper--wrapper"
          >
            <ul
              className={cx(
                'mt-[1px]  h-[252px] w-full overflow-hidden rounded',
                // 'pointer-events-none',
                'pointer-events-auto',
                'font-mono',
                // 'flex',
                'invisible hidden',
              )}
            >
              {menus.map((menu, order) => {
                return (
                  <li
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className={cx(
                      'relative w-1/4 pt-5',
                      'first-of-type:ml-[calc(14.28571%_+_2.28571px)]',
                      isDebug && `bg-radix-${colors[order]}11`,
                    )}
                    key={menu.id}
                  >
                    <div className="overflow-hidden text-[var(--gray-11)]">
                      <div
                        className={cx(
                          'will-change-transform',
                          'text-xs font-bold uppercase',
                          // @todo(transform)
                          '',
                        )}
                      >
                        {menu.title}
                      </div>
                    </div>
                    <div
                      className={cx(
                        'mt-7 transition-all duration-500 will-change-[opacity]',
                        isVisible
                          ? 'pointer-events-auto opacity-100'
                          : 'pointer-events-none opacity-0',
                      )}
                    >
                      {menu.items.map((item) => {
                        return (
                          <NextLink
                            className="mt-6 font-mono text-sm"
                            href={item.href}
                          >
                            <div className="pointer-events-none mt-1">
                              <div className="overflow-hidden">
                                <div
                                  className={cx(
                                    'will-change-transform',
                                    // @todo(transform)
                                    '',
                                  )}
                                >
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          </NextLink>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* CTA */}
          <div
            className={cx(
              'w-full md:w-3/12',
              'relative mx-4 mt-1 flex items-start justify-end',
              isDebug && 'bg-radix-purple11',
              '',
            )}
            id="nav--desktop-wrapper--cta"
          >
            <NextLink
              className={cx(
                buttonStyles,
                'opacity-100 will-change-[opacity] hover:opacity-10',
                '',
              )}
              href={`/events/2023/08/19/jerome-and`}
              style={{ pointerEvents: 'all' }}
            >
              <CalendarIcon />
              <span>Jerome &: SAT 08/19 09PM</span>
            </NextLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export { Navigation }
