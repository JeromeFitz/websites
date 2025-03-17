'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CaretDownIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import {
  Content as NavigationMenuContent,
  Indicator as NavigationMenuIndicator,
  Item as NavigationMenuItem,
  Link as NavigationMenuLink,
  List as NavigationMenuList,
  Root as NavigationMenuRoot,
  Trigger as NavigationMenuTrigger,
  Viewport as NavigationMenuViewport,
} from '@radix-ui/react-navigation-menu'
// import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment, memo } from 'react'

import { menus } from '@/data/menu'

// const IS_ICON_SHOWN = false

function ListItem({ children, className, href, title, ...props }) {
  return (
    <NavigationMenuLink
      asChild
      className={cx(
        'group',
        'flex flex-row items-center gap-3 p-3 select-none',
        'text-black dark:text-white',
        // 'hover:bg-grayA-4',
        'hover:bg-gray-4',
        'rounded-3 px-3 py-2',
        className,
      )}
      {...props}
    >
      <NextLink href={href}>
        <>
          {/* <div className={cx('items-center justify-start', 'mt-2 h-full', '')}>
            <Pencil2Icon
              aria-hidden
              className={cx(
                'size-4 text-[currentColor]',
                !IS_ICON_SHOWN && 'hidden',
              )}
              label={''}
            />
          </div> */}
          <div
            className={cx(
              'flex flex-col items-start justify-start',
              'mt-0 h-full',
              'group-hover:text-gray-12',
            )}
          >
            <Text
              as="div"
              className={cx(
                'text-gray-12 mb-1 flex items-center gap-2 text-[15px] font-medium whitespace-nowrap',
              )}
            >
              {title}
            </Text>
            <Text className={cx('line-clamp-2')} highContrast size="1">
              {children}
            </Text>
          </div>
        </>
      </NextLink>
    </NavigationMenuLink>
  )
}

function ListRootLink({ menu }) {
  const Icon = menu.icon
  return (
    <NextLink href={menu.href} legacyBehavior passHref>
      <Text
        asChild
        className={cx(
          'group flex',
          'rounded-item',
          // 'hover:bg-grayA-4',
          'hover:bg-gray-4',
          'px-3 py-2',
          'transition-colors',
          'text-gray-11',
          'hover:text-gray-12',
        )}
      >
        <NavigationMenuLink>
          {menu.isParentIconVisible ? (
            <>
              <Icon className="hocus:hover:text-accent-11 mt-1 transition-colors" />
              <span className="hidden">{menu.title}</span>
            </>
          ) : (
            menu.title
          )}
        </NavigationMenuLink>
      </Text>
    </NextLink>
  )
}
const ListRootLinkMemoized = memo(ListRootLink)

function ListParent({ menu }) {
  return (
    <Fragment key={`nav--${menu.id}--p`}>
      {/* @ts-ignore */}
      <NavigationMenuTrigger
        className={cx(
          'group flex items-center justify-center',
          'rounded-item',
          'px-3 py-2',
          'transition-colors',
          'text-gray-11',
          'data-[state=open]:text-gray-12',
          // 'data-[state=open]:bg-grayA-4',
          'data-[state=open]:bg-gray-4',
        )}
      >
        <Button asChild className={cx()} radius="full" size="1" variant="ghost">
          <>
            {menu.title}
            {` `}
            <CaretDownIcon
              aria-hidden
              className={cx(
                'group-data-[state=open]:text-accent-11 text-accent-12 relative top-px mr-1 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180',
              )}
              label={''}
            />
          </>
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={cx(
          'absolute top-0 left-0 duration-250 ease-in-out',
          'data-[motion=from-start]:animate-enterFromLeft',
          'data-[motion=from-end]:animate-enterFromRight',
          'data-[motion=to-start]:animate-exitToLeft',
          'data-[motion=to-end]:animate-exitToRight',
          'origin-[top_center] border-2',
          'shadow-5 rounded-3',
          // 'bg-whiteA-12 dark:bg-blackA-12',
          'bg-white dark:bg-black',
          // 'border-accentA-6 dark:border-accentA-12',
          'border-accent-6 dark:border-accent-12',
          'overflow-hidden',
        )}
      >
        <ul className={cx('mx-4 my-2 flex list-none flex-col p-0', 'min-w-[586px]')}>
          <li
            className={cx(
              'grid [grid-template-columns:1fr_1fr]',
              'gap-3 p-1 outline-hidden',
            )}
          >
            {menu.items.map((item) => {
              if (!item.isActive) return null
              return (
                // @ts-ignore
                <ListItem
                  href={item.href}
                  key={`nav--${menu.id}--p--${item.id}`}
                  title={item.title}
                >
                  {item.titleDescription}
                </ListItem>
              )
            })}
          </li>
        </ul>
      </NavigationMenuContent>
    </Fragment>
  )
}
const ListParentMemoized = memo(ListParent)

const NavigationMenu = () => {
  return (
    <div className="col-span-full hidden md:flex md:items-center md:justify-between">
      {/* @note(navigation) left */}
      <div className={cx('')}>
        <div
          className={cx(
            'flex shrink grow basis-0 items-center justify-center bg-transparent',
          )}
        >
          {/* @ts-ignore */}
          <NavigationMenuRoot
            aria-label="Navigation header with 3 dropdown menus with links and 1 link"
            className={cx('relative flex w-full items-center justify-center')}
          >
            {/* @todo(menu) motion background */}
            {/* @ts-ignore */}
            <NavigationMenuList
              className={cx('m-0 flex list-none justify-center p-0')}
            >
              {menus.map((menu) => {
                if (!menu.isActive) return null
                return (
                  // @ts-ignore
                  <NavigationMenuItem
                    className={cx(
                      'cursor-pointer transition-colors select-none',
                      // 'hocus:hover:text-accent-11',
                      'first-of-type:relative first-of-type:-left-4',
                    )}
                    key={`nav--${menu.id}`}
                  >
                    {menu.isParent ? (
                      <ListParentMemoized key={`nav--${menu.id}--p`} menu={menu} />
                    ) : (
                      <ListRootLinkMemoized key={`nav--${menu.id}--p`} menu={menu} />
                    )}
                  </NavigationMenuItem>
                )
              })}

              {/* @ts-ignore */}
              <NavigationMenuIndicator
                className={cx(
                  'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-[38px] z-[-1] flex h-[10px] items-end justify-center overflow-hidden',
                  // 'transition-[width,transform,_50ms_ease]',
                  // 'transition-[width,transform] duration-250',
                  'transition-[width,transform] !duration-0',
                )}
              >
                <div
                  className={cx(
                    'relative top-[70%] size-[10px] rotate-45 rounded-tl-[2px]',
                    // 'bg-accentA-6 dark:bg-accentA-12',
                    'bg-accent-6 dark:bg-accent-12',
                  )}
                />
              </NavigationMenuIndicator>
            </NavigationMenuList>
            <div className="absolute top-12 left-0 flex w-full justify-start perspective-[2000px]">
              <NavigationMenuViewport
                // @ts-ignore
                className={cx(
                  'absolute',
                  'w-[var(--radix-navigation-menu-viewport-width)]',
                  'h-[var(--radix-navigation-menu-viewport-height)]',
                  'transition-[width,height] duration-250 ease-in-out',
                )}
              />
            </div>
          </NavigationMenuRoot>
        </div>
      </div>
      {/* @note(navigation) right */}
      <div className={cx('')}></div>
    </div>
  )
}

const NavigationMenuMemo = memo(function _NavigationMenuMemo() {
  return <NavigationMenu />
})

export { NavigationMenuMemo as NavigationDesktop }
