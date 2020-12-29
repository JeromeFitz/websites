import '@reach/skip-nav/styles.css'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import _map from 'lodash/map'

import { MdWbSunny } from 'react-icons/md'
import { IoMdMoon } from 'react-icons/io'

import Footer from '~components/Footer'

const links = [
  { active: true, href: '/', title: 'Home' },
  { active: true, href: '/blog', title: 'blog' },
  { active: true, href: '/comedy', title: 'comedy' },
  { active: true, href: '/music', title: 'music' },
  { active: true, href: '/people', title: 'people' },
  { active: true, href: '/podcasts', title: 'podcasts' },
  { active: true, href: '/shows', title: 'shows' },
  { active: true, href: '/venues', title: 'venues' },
]

const Container = ({ children }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="bg-white dark:bg-black">
      <SkipNavLink />
      <nav className="sticky-nav bg-opacity-60 dark:bg-opacity-60 ">
        <div className="flex flex-row justify-between items-center w-full p-8 my-0 md:my-8 mx-auto max-w-4xl">
          <div>
            {_map(links, (link) => (
              <NextLink href={link.href} key={`nav-link-${link.title}`}>
                <a className="p-1 sm:p-4 sm:pl-0 text-gray-900 dark:text-gray-100 capitalize">
                  {link.title}
                </a>
              </NextLink>
            ))}
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="bg-gray-300 dark:bg-gray-700 rounded p-3 h-10 w-10 border border-black dark:border-white"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (
              <span className="h-4 w-4 text-gray-900 dark:text-gray-100">
                {theme === 'dark' ? <MdWbSunny /> : <IoMdMoon />}
              </span>
            )}
          </button>
        </div>
      </nav>
      <SkipNavContent />
      <main className="flex flex-col justify-center px-8">
        <article className="flex flex-col w-full px-2 py-8 md:px-8 my-0 md:my-8 mx-auto max-w-4xl">
          {children}
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Container
