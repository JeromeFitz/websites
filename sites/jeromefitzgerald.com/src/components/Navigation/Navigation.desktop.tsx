'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CaretDownIcon, Pencil2Icon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Button, Text } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment, forwardRef, memo } from 'react'

import { menus } from '@/data/menu'

const IS_ICON_SHOWN = false

const NavigationMenuImpl = () => {
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
          <NavigationMenu.Root
            aria-label="Navigation header with 3 dropdown menus with links and 1 link"
            className={cx('relative flex w-full items-center justify-center')}
          >
            {/* @todo(menu) motion background */}
            {/* @ts-ignore */}
            <NavigationMenu.List
              className={cx('m-0 flex list-none justify-center p-0')}
            >
              {menus.map((menu) => {
                if (!menu.isActive) return null
                const Icon = menu.icon
                return (
                  // @ts-ignore
                  <NavigationMenu.Item
                    className={cx(
                      'cursor-pointer select-none transition-colors',
                      'hocus:hover:text-[var(--accent-11)]',
                      'first-of-type:relative first-of-type:-left-4',
                    )}
                    key={`nav--${menu.id}`}
                  >
                    {menu.isParent ? (
                      <Fragment key={`nav--${menu.id}--p`}>
                        {/* @ts-ignore */}
                        <NavigationMenu.Trigger
                          className={cx(
                            'group flex items-center justify-center',
                            'rounded-[var(--radius-full)] hover:bg-[var(--mauve-a2)]',
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
                                  'duration-250 relative top-[1px] mr-1 text-[var(--accent-12)] transition-transform ease-in group-data-[state=open]:-rotate-180 group-data-[state=open]:text-[var(--accent-11)]',
                                )}
                                label={''}
                              />
                            </>
                          </Button>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="!absolute left-0 top-0 w-full duration-75 ease-in sm:w-auto">
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
                        </NavigationMenu.Content>
                      </Fragment>
                    ) : (
                      <NextLink href={menu.href} legacyBehavior passHref>
                        <Text
                          asChild
                          className={cx(
                            'group flex',
                            // 'place-items-center items-center justify-center',
                            'rounded-[var(--radius-full)] hover:bg-[var(--mauve-a2)]',
                            'px-3 py-2',
                            'transition-colors',
                          )}
                        >
                          <NavigationMenu.Link>
                            {menu.isParentIconVisible ? (
                              <>
                                <Icon className="hocus:hover:text-[var(--accent-11)]  mt-1 transition-colors" />
                                <span className="hidden">{menu.title}</span>
                              </>
                            ) : (
                              menu.title
                            )}
                          </NavigationMenu.Link>
                        </Text>
                      </NextLink>
                    )}
                  </NavigationMenu.Item>
                )
              })}

              {/* @ts-ignore */}
              <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                <div className="relative top-[70%] size-[10px] rotate-[45deg] rounded-tl-[2px] bg-[var(--accent-a6)] dark:bg-[var(--accent-a12)]" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-start">
              <NavigationMenu.Viewport
                // @ts-ignore
                className={cx(
                  'absolute',
                  'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut   shadow-6 mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[var(--radius-1)] border-2 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]',
                  'bg-white dark:bg-black',
                  'border-[var(--accent-a6)] dark:border-[var(--accent-a12)]',
                )}
              />
            </div>
          </NavigationMenu.Root>
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
      <NavigationMenu.Link
        className={cx(
          'group',
          'flex select-none flex-row items-center gap-3 p-3',
          'text-black dark:text-white',
          'hover:bg-[var(--mauve-a4)]',
          'rounded-[var(--radius-3)] px-3 py-2',
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
              'group-hover:text-[var(--mauve-12)]',
            )}
          >
            <Text
              as="div"
              className={cx(
                'mb-1 flex items-center gap-2 whitespace-nowrap text-[15px] font-medium text-[var(--mauve12)]',
              )}
            >
              {title}
            </Text>
            <Text className={cx('line-clamp-2')} highContrast size="1">
              {children}
            </Text>
          </div>
        </>
      </NavigationMenu.Link>
    </NextLink>
  ),
)

const NavigationMenuMemo = memo(function _NavigationMenuMemo() {
  return <NavigationMenuImpl />
})

export { NavigationMenuMemo as NavigationDesktop }
