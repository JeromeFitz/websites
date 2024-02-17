'use client'
import { HomeIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { useStore } from '~store/index'

import { ThemeToggle } from './Header.ThemeToggle'
import { NavigationMenu } from './elements/NavigationMenu'

const isDev = process.env.NODE_ENV === 'development'

const items = [
  { href: '/events', id: '/events', isActive: true, title: 'Upcoming Events' },
  {
    href: '/shows',
    id: '/shows',
    isActive: true,
    title: 'Shows',
  },
  { href: '/podcasts', id: '/podcasts', isActive: true, title: 'Podcasts' },
  //
  { href: '', id: '/blank-0', isActive: true, title: '‎' },
  { href: '', id: '/blank-1', isActive: true, title: 'Currently:' },
  { href: '/books', id: '/books', isActive: true, title: '→ Reading … ' },
  { href: '/music', id: '/music', isActive: true, title: '→ Listening To … ' },
  { href: '', id: '/blank-2', isActive: true, title: '‎' },
  //
  { href: '', id: '/blank-3', isActive: true, title: 'Other Stuff:' },
  { href: '/about', id: '/about', isActive: true, title: 'About' },
  { href: '/colophon', id: '/colophon', isActive: true, title: 'Colophon' },
  { href: '/contact', id: '/contact', isActive: true, title: 'Contact' },
  {
    href: '/playground/layout',
    id: '/playground/layout',
    isActive: isDev,
    title: 'Playground',
  },
]

const useStoreMenu = () => {
  return useStore((store) => ({
    isMenuOpen: store.isMenuOpen,
    isMenuOpenSet: store.isMenuOpenSet,
  }))
}

function Header({}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { isMenuOpen, isMenuOpenSet } = useStoreMenu()
  return (
    <>
      <header
        className={cx(
          'fixed left-0 top-[-1px] w-full',
          // potential variables:
          // border-color, fill, height
          'z-30 md:z-20',
          'h-[var(--header-height)]',
          isMenuOpen && 'z-50',
          'font-sans',
        )}
      >
        <div
          className={cx(
            'relative z-10 grid h-full select-none justify-between gap-[var(--grid-margin)]',
            'grid-cols-[auto_auto] md:grid-cols-[auto_1fr_var(--sidebar-width)]',
            'items-baseline md:items-center',
            // 'mt-1.5',
            '',
          )}
          id="header--fg"
        >
          <NextLink
            className={cx(
              // 'md:relative md:hidden',
              'md:relative md:flex',
              'md:z-10  md:items-center',
              'md:gap-[0.5rem] md:p-[0_var(--grid-margin)]',
              'flex h-full items-center p-[0_var(--grid-gap)]',
              'relative z-10 justify-center no-underline',
              'mt-1',
              'hover:text-[var(--accent-a8)] dark:hover:text-[var(--accent-a9)]',
              '',
            )}
            href="/"
            id="header--fg--a"
          >
            <span className={cx('inline-flex shrink-0 pr-1.5')}>
              <HomeIcon />
            </span>
            <span className={cx('hidden')}>Jerome Fitzgerald</span>
          </NextLink>
          <button
            className={cx(
              'font-mono text-sm md:hidden',
              'mr-[0.25rem] p-[0_var(--grid-gap)]',
              // 'pr-5',
              'flex h-full items-center',
              'relative z-10 justify-end underline md:justify-center',
              // 'bg-radix-green10'
            )}
            id="header--fg--button"
            onClick={() => {
              console.log(`isMenuOpen (0): ${isMenuOpen ? 'y' : 'n'}`)
              isMenuOpenSet()
              console.log(`isMenuOpen (1): ${isMenuOpen ? 'y' : 'n'}`)
              if (!isMenuOpen) {
                document.body.classList.add('!overflow-hidden')
              } else {
                document.body.classList.remove('!overflow-hidden')
              }
            }}
          >
            {isMenuOpen ? 'Close Menu' : 'Menu'}
          </button>
          <nav
            className={cx(
              'pointer-events-none md:pointer-events-auto',
              'flex h-full min-h-screen flex-col',
              'md:inline md:h-fit md:min-h-0 md:flex-none',
              // 'bg-radix-yellow8',
              'opacity-0 md:opacity-100',
              // 'transition-all duration-500',
              'data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 data-[open=true]:transition-opacity',
              // mobile
              'fixed left-0 top-0 w-full backdrop-blur-sm',
              'p-[calc(var(--header-height)_+_min(5.5vh,2.5rem))_var(--grid-margin)_3rem]',
              'md:relative md:left-auto md:top-auto md:w-auto md:backdrop-blur-none',
              'md:p-0 ',
              'bg-[var(--whiteA12)] dark:bg-[var(--blackA12)]',
              'md:bg-transparent dark:md:bg-transparent',
              // desktop
              '',
            )}
            data-open={isMenuOpen}
            id="header--fg--nav"
            onClick={() => {
              // console.log(`isMenuOpen (0): ${isMenuOpen ? 'y' : 'n'}`)
              // isMenuOpenSet((isMenuOpen) => !isMenuOpen)
              // console.log(`isMenuOpen (1): ${isMenuOpen ? 'y' : 'n'}`)
              // if (!isMenuOpen) {
              //   document.body.classList.add('!overflow-hidden')
              // } else {
              //   document.body.classList.remove('!overflow-hidden')
              // }
            }}
          >
            <ul
              className={cx(
                'h-full gap-[min(2.5vh,var(--grid-gap))_2rem]',
                'flex flex-col md:flex-row',
                'md:hidden',
              )}
              id="header--fg--nav--ul"
            >
              {items.map((item) => {
                if (!item.isActive) return null
                return (
                  <li
                    className={cx(
                      'relative flex items-center md:h-full',
                      'text-3xl font-black uppercase',
                      'md:text-base md:font-normal md:normal-case',
                      'ml-1 md:ml-0',
                    )}
                    id={`header--fg--nav--ul--li--${item.id}`}
                    key={`link-${item.id}`}
                  >
                    {item.href === '' ? (
                      <span className="font-mono text-lg font-semibold uppercase">
                        {item.title}
                      </span>
                    ) : (
                      <NextLink
                        href={item.href}
                        onClick={() => {
                          if (!isMenuOpen) {
                            document.body.classList.add('!overflow-hidden')
                          } else {
                            document.body.classList.remove('!overflow-hidden')
                          }
                          isMenuOpenSet()
                        }}
                      >
                        {item.title}
                      </NextLink>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="hidden md:inline">
              <NavigationMenu />
            </div>
            <div className={cx('md:hidden', 'mr-3')} id="header--fg--nav--bottom">
              <div className={cx('', '')}>
                <div className={cx('flex  justify-between')}>
                  <div className={cx('flex items-center gap-1')}>
                    <ThemeToggle />
                  </div>
                  <p className="mr-1">
                    <span>
                      <span>Nice Group of People, LLC –&nbsp;</span>
                      <span>{new Date().getFullYear()}</span>
                    </span>
                  </p>
                </div>
                <div
                  className={cx(
                    'relative h-5 w-full rounded border border-[var(--accent-8)]',
                    '',
                    '[mask-image:linear-gradient(transparent_50%,#000000_0)]',
                    '[-webkit-mask-image:linear-gradient(transparent_50%,#000000_0)]',
                  )}
                />
              </div>
            </div>
          </nav>
          <aside
            className={cx(
              'mr-2 justify-end',
              ' h-full items-center p-[0_var(--grid-gap)]',
              'hidden md:visible md:flex',
              // 'hidden'
            )}
            id="header--fg--aside"
          >
            <div
              className={cx('items-center gap-[0.25rem] md:flex')}
              id="header--fg-aside--a"
            >
              <ThemeToggle />
            </div>
          </aside>
          <div
            className={cx(
              'pointer-events-none',
              'absolute top-[100%] h-5 rounded border border-[var(--accent-11)] ',
              'ml-[var(--grid-margin)] w-[calc(var(--cols)*var(--grid-cols)_-_var(--gutter))]',
              '',
              '[mask-image:linear-gradient(#000_50%,transparent_0)]',
              '[-webkit-mask-image:linear-gradient(#000_50%,transparent_0)]',
            )}
            id="header--fg--border"
          />
        </div>
        <div
          className={cx(
            'pointer-events-none',
            'absolute left-0 top-0 w-full',
            'h-[var(--header-height)]',
            'backdrop-blur-md',
            '',
          )}
          id="header--blur"
        />
      </header>
    </>
  )
}

export { Header }
