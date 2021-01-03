import '@reach/skip-nav/styles.css'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import cx from 'clsx'
import _map from 'lodash/map'
import _capitalize from 'lodash/capitalize'
import { MdWbSunny } from 'react-icons/md'
import { IoMdMoon } from 'react-icons/io'

import Footer from '~components/Footer'
import SplitText from '~components/SplitText'

const isDev = process.env.NODE_ENV !== 'production'

const links = [
  { active: true, href: '/', title: 'home' },
  { active: true, href: '/blog', title: 'blog' },
  { active: true, href: '/comedy', title: 'comedy' },
  { active: true, href: '/music', title: 'music' },
  { active: false, href: '/people', title: 'people' },
  { active: true, href: '/podcasts', title: 'podcasts' },
  { active: true, href: '/shows', title: 'shows' },
  { active: false, href: '/venues', title: 'venues' },
  { active: isDev, href: '/playground', title: 'playground' },
]

const Layout = ({ children }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const router = useRouter()

  return (
    <div>
      <SkipNavLink />
      <nav className="sticky-nav bg-opacity-50 dark:bg-opacity-50 z-40 top-0 sticky">
        <div
          className={cx(
            'flex flex-row justify-between items-center',
            'w-full p-8 my-0 md:my-8 mx-auto max-w-4xl'
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

                const linkTitle = _capitalize(link.title)

                return (
                  <NextLink href={link.href} key={`nav-link-${link.title}`}>
                    <a
                      className={cx(
                        'p-1 md:p-4 md:pl-0',
                        'font-semibold text-base md:text-lg',
                        !isSelected &&
                          'hover:text-green-500 dark:hover:text-yellow-200',
                        isSelected &&
                          'underline underline-thickness-sm underline-offset-lg font-bold'
                      )}
                      aria-label={linkTitle}
                    >
                      <SplitText splitBy="letter" text={linkTitle} />
                    </a>
                  </NextLink>
                )
              })}
          </div>
          <button
            aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
            className={cx(
              'bg-gray-300 dark:bg-gray-700',
              'rounded p-3 h-10 w-10',
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
      </nav>
      <SkipNavContent />
      <main className="flex flex-col justify-center px-4 md:px-8">
        <article
          className={cx(
            'flex flex-col w-full max-w-4xl',
            'px-2 py-8 md:px-8 my-0 md:my-8 mx-auto'
          )}
        >
          {children}
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
