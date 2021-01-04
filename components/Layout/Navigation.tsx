import { memo } from 'react'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import cx from 'clsx'
import _map from 'lodash/map'
import title from 'title'
import { MdWbSunny } from 'react-icons/md'
import { IoMdMoon } from 'react-icons/io'

import SplitText from '~components/SplitText'

const isDev = false
// const isDev = process.env.NODE_ENV !== 'production'

const links = [
  { active: true, href: '/', title: 'home', titleMobile: 'home' },
  { active: isDev, href: '/blog', title: 'blog', titleMobile: 'blog' },
  { active: false, href: '/comedy', title: 'comedy', titleMobile: 'comedy' },
  {
    active: true,
    href: '/shows',
    title: 'featured shows',
    titleMobile: 'shows',
  },
  {
    active: true,
    href: '/events',
    title: 'upcoming events',
    titleMobile: 'events',
  },
  { active: true, href: '/music', title: 'music', titleMobile: 'music' },
  { active: false, href: '/people', title: 'people', titleMobile: 'people' },
  { active: true, href: '/podcasts', title: 'podcasts', titleMobile: 'podcasts' },
  { active: false, href: '/venues', title: 'venues', titleMobile: 'venues' },
  {
    active: isDev,
    href: '/playground',
    title: 'playground',
    titleMobile: 'playground',
  },
]

const Navigation = memo(() => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const router = useRouter()

  return (
    <>
      <SkipNavLink />
      <nav className="bg-blur bg-opacity-50 dark:bg-opacity-50 z-40 top-0 sticky min-w-full">
        <div
          className={cx(
            'flex flex-row justify-between items-center',
            // 'w-full p-8 my-0 md:my-8 mx-auto max-w-4xl'
            'w-full max-w-4xl',
            'mx-auto',
            'my-0 md:my-8',
            'p-4 md:p-6'
          )}
        >
          <div>
            {mounted &&
              _map(links, (link) => {
                if (!link.active) {
                  return true
                }
                // @refactor(isSelected) This is ... a mess haha
                const isSelected =
                  (router.asPath.length > 1 &&
                    router.asPath.startsWith(link.href) &&
                    link.title !== 'home') ||
                  (router.asPath.length === 1 && link.title === 'home')

                const linkTitle = title(link.title)
                const linkTitleMobile = title(link.titleMobile)

                return (
                  <NextLink href={link.href} key={`nav-link-${link.title}`}>
                    <a
                      className={cx(
                        'p-1 md:p-4 md:pl-0',
                        'font-semibold text-sm md:text-lg',
                        !isSelected &&
                          'hover:text-green-500 dark:hover:text-yellow-200',
                        isSelected &&
                          'underline underline-thickness-sm underline-offset-lg font-bold'
                      )}
                      aria-label={linkTitle}
                    >
                      <span className="md:hidden">{linkTitleMobile}</span>
                      <span className="hidden md:inline-flex flex-row flex-wrap">
                        <SplitText splitBy="letter" text={linkTitle} />
                      </span>
                    </a>
                  </NextLink>
                )
              })}
          </div>
          <div>
            <button
              aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} mode`}
              type="button"
              className={cx(
                'bg-gray-300 dark:bg-gray-700',
                'rounded-3xl',
                'p-1.5 h-8 w-8 md:p-3 md:h-10 md:w-10',
                'border border-black dark:border-white'
              )}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {mounted && (
                <span className="h-4 w-4 text-gray-900 dark:text-gray-100">
                  {theme === 'light' ? (
                    <IoMdMoon className="text-black" />
                  ) : (
                    <MdWbSunny className="text-white" />
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <SkipNavContent />
    </>
  )
})

export default Navigation
