/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Root as PortalRoot } from '@radix-ui/react-portal'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { useTheme } from 'next-themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import {
  AccordionContent,
  AccordionItem,
  AccordionList,
  AccordionListItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/Accordion'
import { menus } from '@/data/menu'
import { useStore } from '@/store/index'

const useStoreMenu = () => {
  return useStore((store) => ({
    isMenuMobileOpen: store.isMenuMobileOpen,
    isMenuMobileOpenSet: store.isMenuMobileOpenSet,
  }))
}

const AccordionNavigation = () => {
  const { isMenuMobileOpen, isMenuMobileOpenSet } = useStoreMenu()
  const handleOnClick = () => {
    if (!isMenuMobileOpen) {
      document.body.classList.add('!overflow-hidden')
    } else {
      document.body.classList.remove('!overflow-hidden')
    }
    isMenuMobileOpenSet()
  }

  return (
    <AccordionRoot
      className={cx(
        'mt-10 min-w-full max-w-full',
        'rounded-3 bg-gray-6 w-[300px]',
        'shadow-[0_2px_10px] shadow-black/5 dark:shadow-white/10',
        'border-1 border-black/5 dark:border-white/10',
      )}
      // @todo(types) radix
      // @ts-ignore
      collapsible
      defaultValue="item-1"
      type="single"
    >
      {menus.map((menu) => {
        if (!menu.isActiveMobileOverride) return null
        // const Icon = menu.icon
        return (
          // @todo(types) radix
          // @ts-ignore
          <AccordionItem key={`nav--mobile--${menu.id}`} value={menu.id}>
            <AccordionTrigger>{menu.title}</AccordionTrigger>
            <AccordionContent>
              <AccordionList>
                {menu.items.map((item) => {
                  if (!item.isActiveMobileOverride) return null
                  return (
                    <AccordionListItem
                      href={item.href}
                      icon={item.icon ? item.icon : menu.icon}
                      key={`nav--${menu.id}--p--${item.id}`}
                      onClick={() => handleOnClick()}
                    >
                      {item.title}
                    </AccordionListItem>
                  )
                })}
              </AccordionList>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </AccordionRoot>
  )
}

function NavigationMobile() {
  const { setTheme, theme } = useTheme()
  const { isMenuMobileOpen, isMenuMobileOpenSet } = useStoreMenu()
  const handleOnClick = () => {
    if (!isMenuMobileOpen) {
      document.body.classList.add('!overflow-hidden')
    } else {
      document.body.classList.remove('!overflow-hidden')
    }
    isMenuMobileOpenSet()
  }
  return (
    <>
      <Button
        className={cx(
          'col-span-full flex cursor-pointer items-center justify-end gap-2 md:hidden',
        )}
        color="pink"
        onClick={handleOnClick}
        size="2"
        variant="ghost"
      >
        <span>{isMenuMobileOpen ? `Close` : `Open`} Menu</span>
        {isMenuMobileOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
      </Button>
      {isMenuMobileOpen && (
        // @todo(radix) children
        // @ts-ignore
        <PortalRoot>
          <nav
            className={cx(
              // '[--header-height:57px]',
              // @todo(layout) uh fix this please heh
              'top-[calc(var(--header-height)_-_5px)]',
              // 'top-1',
              'fixed inset-x-0 bottom-0 size-full max-w-[100vw]',
              // 'bg-grayA-1 backdrop-blur-sm',
              'bg-white dark:bg-black',
              'px-6 pb-6 pt-0',
              'visible z-50',
              'overflow-y-scroll',
              'block',
            )}
          >
            <div
              className={cx(
                'm-0 mt-2 list-none p-0 pt-2',
                'mx-auto max-w-screen-lg',
              )}
            >
              <ul className={cx()}>
                <NextLink
                  className={cx('cursor-pointer text-inherit no-underline')}
                  href={'/'}
                  onClick={handleOnClick}
                >
                  <li
                    className={cx(
                      'flex w-full cursor-pointer select-none items-center',
                      // 'transition-colors',
                      '',
                    )}
                  >
                    <Button
                      className={cx('h-10 min-w-full max-w-full px-4')}
                      color="pink"
                      size="4"
                      variant="surface"
                    >
                      Home
                    </Button>
                  </li>
                </NextLink>
              </ul>
              <AccordionNavigation />
            </div>
          </nav>
          <div
            className={cx(
              'fixed left-0 top-0 z-[99999] flex flex-row items-end justify-start py-4',
              // 'bg-accent-4',
            )}
          >
            <Button
              className={cx(
                'col-span-full flex cursor-pointer items-center justify-end gap-2 px-7 md:hidden',
              )}
              color="pink"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              size="2"
              variant="ghost"
            >
              <span>Toggle Theme</span>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        </PortalRoot>
      )}
    </>
  )
}

export { NavigationMobile }
