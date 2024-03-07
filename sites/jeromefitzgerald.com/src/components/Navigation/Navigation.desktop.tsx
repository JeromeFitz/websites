'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CaretDownIcon, Pencil2Icon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Root as NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@radix-ui/react-navigation-menu'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment, forwardRef, memo } from 'react'

import { menus } from '@/data/menu'

const IS_ICON_SHOWN = false

const NavigationMenu = () => {
  return (
    <div className="col-span-full hidden lg:flex lg:items-center lg:justify-between">
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
                const Icon = menu.icon
                return (
                  // @ts-ignore
                  <NavigationMenuItem
                    className={cx(
                      'cursor-pointer select-none transition-colors',
                      'hocus:hover:text-accent-11',
                      'first-of-type:relative first-of-type:-left-4',
                    )}
                    key={`nav--${menu.id}`}
                  >
                    {menu.isParent ? (
                      <Fragment key={`nav--${menu.id}--p`}>
                        {/* @ts-ignore */}
                        <NavigationMenuTrigger
                          className={cx(
                            'group flex items-center justify-center',
                            'rounded-item hover:bg-grayA-2',
                            'px-3 py-2',
                            'transition-colors',
                          )}
                        >
                          <Button
                            asChild
                            className={cx()}
                            radius="full"
                            size="1"
                            variant="ghost"
                          >
                            <>
                              {menu.title}
                              {` `}
                              <CaretDownIcon
                                aria-hidden
                                className={cx(
                                  'duration-250 group-data-[state=open]:text-accent-11 text-accent-12 relative top-[1px] mr-1 transition-transform ease-in group-data-[state=open]:-rotate-180',
                                )}
                                label={''}
                              />
                            </>
                          </Button>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!absolute left-0 top-0 w-full duration-75 ease-in sm:w-auto">
                          <ul
                            className={cx(
                              'mx-4 my-2 flex list-none flex-col p-0',
                              'w-[586px]',
                            )}
                          >
                            <li
                              className={cx(
                                'grid [grid-template-columns:1fr_1fr]',
                                'gap-3 p-1 outline-none',
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
                    ) : (
                      <NextLink href={menu.href} legacyBehavior passHref>
                        <Text
                          asChild
                          className={cx(
                            'group flex',
                            // 'place-items-center items-center justify-center',
                            'hover:bg-grayA-2 rounded-item',
                            'px-3 py-2',
                            'transition-colors',
                          )}
                        >
                          <NavigationMenuLink>
                            {menu.isParentIconVisible ? (
                              <>
                                <Icon className="hocus:hover:text-accent-11  mt-1 transition-colors" />
                                <span className="hidden">{menu.title}</span>
                              </>
                            ) : (
                              menu.title
                            )}
                          </NavigationMenuLink>
                        </Text>
                      </NextLink>
                    )}
                  </NavigationMenuItem>
                )
              })}

              {/* @ts-ignore */}
              <NavigationMenuIndicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                <div className="bg-accentA-6 dark:bg-accentA-12 relative top-[70%] size-[10px] rotate-[45deg] rounded-tl-[2px]" />
              </NavigationMenuIndicator>
            </NavigationMenuList>

            <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-start">
              <NavigationMenuViewport
                // @ts-ignore
                className={cx(
                  'absolute',
                  'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut   shadow-6 rounded-1 mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden border-2 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]',
                  'bg-white dark:bg-black',
                  'border-accentA-6 dark:border-accentA-12',
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

const ListItem = forwardRef(
  // @ts-ignore
  ({ children, className, title, ...props }, forwardedRef) => (
    <NextLink
      {...props}
      legacyBehavior
      passHref
      // @ts-ignore
      ref={forwardedRef}
    >
      <NavigationMenuLink
        className={cx(
          'group',
          'flex select-none flex-row items-center gap-3 p-3',
          'text-black dark:text-white',
          'hover:bg-grayA-4',
          'rounded-3 px-3 py-2',
          className,
        )}
      >
        <>
          <div className={cx('items-center justify-start', 'mt-2 h-full', '')}>
            <Pencil2Icon
              aria-hidden
              className={cx(
                'size-4 text-[currentColor]',
                !IS_ICON_SHOWN && 'hidden',
              )}
              label={''}
            />
          </div>
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
                'text-gray-12 mb-1 flex items-center gap-2 whitespace-nowrap text-[15px] font-medium',
              )}
            >
              {title}
            </Text>
            <Text className={cx('line-clamp-2')} highContrast size="1">
              {children}
            </Text>
          </div>
        </>
      </NavigationMenuLink>
    </NextLink>
  ),
)

const NavigationMenuMemo = memo(function _NavigationMenuMemo() {
  return <NavigationMenu />
})

export { NavigationMenuMemo as NavigationDesktop }
