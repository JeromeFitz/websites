import { memo, useState, useEffect } from 'react'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import cx from 'clsx'
import _map from 'lodash/map'
import _title from 'title'
import { MdWbSunny } from 'react-icons/md'
import { IoMdMoon } from 'react-icons/io'

import SplitText from '~components/SplitText'
import { navigation as links } from '~config/notion/website'

const Navigation = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const router = useRouter()

  return (
    <>
      <SkipNavLink />
      <nav className="bg-blur bg-opacity-50 dark:bg-opacity-50 z-40 top-0 sticky min-w-full">
        <svg className="svg-blur" style={{ display: 'none' }}>
          <filter id="sharpBlur">
            <feGaussianBlur stdDeviation="36"></feGaussianBlur>
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
            ></feColorMatrix>
            <feComposite in2="SourceGraphic" operator="in"></feComposite>
          </filter>
        </svg>
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

                const linkTitle = _title(link.title)
                const linkTitleMobile = _title(link.titleMobile)

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
}

export default memo(Navigation)
