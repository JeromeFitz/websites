/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HomeIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { CaretDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import React from 'react'

import { menus } from '~data/menu'

const NavigationMenuImpl = () => {
  return (
    // @ts-ignore
    <NavigationMenu.Root className="relative z-40 flex w-3/4 justify-start font-mono">
      {/* @ts-ignore */}
      <NavigationMenu.List
        className={cx(
          'm-0 flex list-none rounded-sm p-1 ',
          // 'shadow-[var(--black-a4)] shadow-[0_2px_10px]',
          // 'bg-[var(--gray-1)] dark:bg-[var(--gray-12)]',
          '',
        )}
      >
        {/* @ts-ignore */}
        <NavigationMenu.Item className="hidden">
          <NextLink href="/" legacyBehavior passHref>
            <NavigationMenu.Link className="block select-none rounded-[4px] px-3 py-2 text-base font-medium leading-none text-[var(--accent-a1)] no-underline outline-none hover:bg-[var(--accent-a1)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a7)]">
              <span className={cx('inline-flex shrink-0 pr-1.5')}>
                <HomeIcon />
              </span>
              <span className={cx('hidden')}>Jerome Fitzgerald</span>
            </NavigationMenu.Link>
          </NextLink>
        </NavigationMenu.Item>
        {menus.map((menu) => {
          if (!menu.isActive) return null
          return (
            // @ts-ignore
            <NavigationMenu.Item key={`nav--${menu.id}`}>
              {menu.isParent ? (
                <React.Fragment key={`nav--${menu.id}--p`}>
                  {/* @ts-ignore */}
                  <NavigationMenu.Trigger
                    className={cx(
                      'group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-base font-medium leading-none text-[var(--accent-a12)] outline-none hover:bg-[var(--accent-a2)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a7)]',
                      'data-[state=open]:shadow-[0_2px_10px] data-[state=open]:shadow-[var(--black-a4)]',
                      '',
                    )}
                  >
                    <Text>{menu.title}</Text>
                    <CaretDownIcon
                      aria-hidden
                      className={cx(
                        'duration-250 relative top-[1px] text-[var(--accent-a12)] transition-transform ease-in group-data-[state=open]:-rotate-180',
                      )}
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
                    <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
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
                    </ul>
                  </NavigationMenu.Content>
                </React.Fragment>
              ) : (
                <NextLink href={menu.href} legacyBehavior passHref>
                  <Text
                    asChild
                    className="block select-none rounded-[4px] px-3 py-2 text-base font-medium leading-none text-[var(--accent-a12)] no-underline outline-none hover:bg-[var(--accent-a1)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a7)]"
                    // color="pink"
                  >
                    <NavigationMenu.Link>{menu.title}</NavigationMenu.Link>
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
            'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut  relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-sm border-2 shadow-xl transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]',
            '',
            'bg-white dark:bg-black',
            '',
            'border-[var(--accent-a6)] dark:border-[var(--accent-a12)]',
            '',
            '',
            '',
            '',
            '',
            '',
          )}
        />
      </div>
    </NavigationMenu.Root>
  )
}

const ListItem = React.forwardRef(
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
          'block select-none rounded-md p-3 text-base leading-none no-underline outline-none transition-colors hover:bg-[var(--accent-a2)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a9)] dark:hover:bg-[var(--accent-a6)]',
          className,
        )}
      >
        <Text as="p" color="pink">
          {title}
        </Text>
        <Text highContrast>{children}</Text>
      </NavigationMenu.Link>
    </NextLink>
  ),
)

export { NavigationMenuImpl as NavigationMenu }
