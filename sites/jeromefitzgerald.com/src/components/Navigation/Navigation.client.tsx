'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { CaretDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

const menus = [
  {
    href: '/',
    id: 'pages',
    items: [
      { href: '/about', id: '/about', title: 'About' },
      { href: '/contact', id: '/contact', title: 'Contact' },
    ],
    title: 'Pages',
  },
  {
    href: '/events',
    id: 'events',
    items: [
      {
        href: '/events/2023/08/04/your-act',
        id: '/events/2023/08/04/your-act',
        title: 'Your Act',
      },
      {
        href: '/events/2023/08/19/jerome-and',
        id: '/events/2023/08/19/jerome-and',
        title: 'Jerome &',
      },
      { href: '/events', id: '/events/view-all', title: 'View All' },
    ],
    title: 'Events',
  },
  {
    href: '/shows',
    id: 'shows',
    items: [
      {
        href: '/shows/jerome-and',
        id: '/shows/jerome-and',
        title: 'Jerome &',
      },
      {
        href: '/shows/jfle',
        id: '/shows/jfle',
        title: 'JFLE',
      },
      { href: '/shows', id: '/shows/view-all', title: 'View All' },
    ],
    title: 'Shows',
  },
]

const NavigationMenuImpl = () => {
  const isOpenOverride = true
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <NavigationMenu.Root className="relative z-[9999] flex w-screen justify-center">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <NavigationMenu.List className="m-0 flex list-none justify-center rounded-sm bg-[var(--gray-12)] p-1 shadow-[0_2px_10px] shadow-[var(--black-a7)]">
        {menus.map((menu) => {
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <NavigationMenu.Item>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <NavigationMenu.Trigger
                className="group flex select-none items-center justify-between gap-1 rounded-[4px] px-3 py-2 text-base font-medium leading-none text-[var(--accent-11)] outline-none hover:bg-[var(--accent-3)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-7)]"
                data-state={isOpenOverride ? 'open' : 'closed'}
              >
                {menu.title}
                <CaretDownIcon
                  aria-hidden
                  className="duration-250 relative top-[1px] text-[var(--accent-10)] transition-transform ease-in group-data-[state=open]:-rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={cx(
                  'data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 w-full sm:w-auto',
                )}
                data-state={isOpenOverride ? 'open' : 'closed'}
              >
                <ul className="m-0 grid list-none gap-x-2 p-5 sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                  {menu.items.map((item) => {
                    return (
                      <ListItem href={item.href} key={item.id} title={item.title}>
                        {item.title}
                      </ListItem>
                    )
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          )
        })}

        {/* <NavigationMenu.Item>
          <NavigationMenu.Link
            className="text-[var(--accent-11)] hover:bg-[var(--accent-3)] focus:shadow-[var(--accent-7)] block select-none rounded-[4px] px-3 py-2 text-base font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
            href="https://github.com/radix-ui"
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item> */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <NavigationMenu.Indicator
          className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]"
          data-state={isOpenOverride ? 'visible' : 'hidden'}
        >
          <div className="relative top-[70%] size-[10px] rotate-[45deg] rounded-tl-[2px] bg-[var(--gray-12)]" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-sm bg-[var(--gray-12)] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"
          data-state={isOpenOverride ? 'visible' : 'hidden'}
        />
      </div>
    </NavigationMenu.Root>
  )
}

// @todo(types)
const ListItem = React.forwardRef<any, any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children, className, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={cx(
            'block select-none rounded-sm p-3 text-base leading-none no-underline outline-none transition-colors hover:bg-[var(--gray-3)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a7)]',
            className,
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="mb-[5px] font-medium leading-[1.2] text-[var(--accent-11)]">
            {title}
          </div>
          {/* <p className="text-[var(--gray-11)] leading-[1.4]">{children}</p> */}
        </a>
      </NavigationMenu.Link>
    </li>
  ),
)

export { NavigationMenuImpl as NavigationMenu }
