'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HomeIcon } from '@jeromefitz/ds/components/Icon'
import { CaretDownIcon, Pencil2Icon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Button, Text } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import React from 'react'

const isDev = process.env.NODE_ENV === 'development'

const menus = [
  {
    href: '/events',
    id: 'upcoming-events',
    isActive: true,
    isParent: true,
    items: [
      {
        href: '/events',
        id: 'upcoming-events',
        isActive: false,
        title: 'Upcoming Events',
        titleInfo: 'Jerome is cooking something up at the moment.',
      },
      {
        href: '/events',
        id: 'all-events',
        isActive: true,
        title: '… All Events',
        titleInfo: 'Including recent past events.',
      },
    ],
    title: 'Upcoming Events',
  },
  {
    href: '/shows',
    id: 'shows',
    isActive: true,
    isParent: true,
    items: [
      {
        href: '/shows/alex-o-jerome',
        id: '/shows/alex-o-jerome',
        isActive: true,
        title: 'Alex O’Jerome',
        titleInfo: 'Chicago to Pittsburgh Connection. Dem Vomit Twinz.',
      },
      {
        href: '/shows/bubble-boy-the-musical',
        id: '/shows/bubble-boy-the-musical',
        isActive: true,
        title: 'Bubble Boy: The Musical',
        titleInfo: 'A musical ahead of its time by Cinco Paul',
      },
      {
        href: '/shows/jfle',
        id: '/shows/jfle',
        isActive: true,
        title: 'JFLE (Jerome & Jesse LE)',
        titleInfo: 'Delightful absurdity with dark whimsy and musical skill',
      },
      {
        href: '/shows/justin-and-jerome-experience',
        id: '/shows/justin-and-jerome-experience',
        isActive: false,
        title: 'Justin & Jerome Experience',
        titleInfo: 'Acclaimed improv and heralded sketch (on-and-off stage)',
      },
      {
        href: '/shows/my-dinner-with-andre-the-musical',
        id: '/shows/my-dinner-with-andre-the-musical',
        isActive: true,
        title: 'My Dinner With André: The Musical',
        titleInfo: 'The cult classic gets the Justin & Jerome Experience treatment.',
      },
      {
        href: '/shows/the-death-show',
        id: '/shows/the-death-show',
        isActive: true,
        title: 'The Death Show',
        titleInfo: 'The longest running death themed improv show.',
      },
      {
        href: '/shows',
        id: 'all-shows',
        isActive: true,
        title: '… All Shows',
        titleInfo: 'If you can believe, there are more.',
      },
    ],
    title: 'Shows',
  },
  {
    href: '/',
    id: 'pages',
    isActive: true,
    isParent: true,
    items: [
      {
        href: '/about',
        id: '/about',
        isActive: true,
        title: 'About',
        titleInfo: 'Yea. Who is he?',
      },
      {
        href: '/books',
        id: '/books',
        isActive: true,
        title: 'Books',
        titleInfo: 'Currently Reading… ',
      },
      {
        href: '/colophon',
        id: '/colophon',
        isActive: true,
        title: 'Colophon',
        titleInfo: 'How was this built?',
      },
      {
        href: '/contact',
        id: '/contact',
        isActive: true,
        title: 'Contact',
        titleInfo: 'IDK. Sure why not',
      },
      {
        href: '/music',
        id: '/music',
        isActive: true,
        title: 'Music',
        titleInfo: 'Currently Listening to… ',
      },
      {
        href: '/podcasts',
        id: '/podcasts',
        isActive: true,
        title: 'Podcasts',
        titleInfo: 'Host & Features “galore”',
      },
    ],
    title: '… More',
  },
  {
    href: '/contact',
    id: '/contact',
    isActive: false,
    isParent: false,
    items: [],
    title: 'Contact',
  },
  {
    href: '/playground/2024',
    id: '/playground/2024',
    isActive: isDev,
    isParent: false,
    items: [],
    title: 'Playground',
  },
]

const NavigationMenuImpl = () => {
  return (
    <>
      <div>
        <NextLink
          className={cx(
            'block select-none rounded-[4px] px-3 py-2 text-base font-medium leading-none text-[var(--accent-a1)] no-underline outline-none hover:bg-[var(--accent-a1)] focus:shadow-[0_0_0_2px] focus:shadow-[var(--accent-a7)]',
          )}
          href="/"
        >
          <span className={cx('inline-flex shrink-0 pr-1.5')}>
            <HomeIcon className="text-black dark:text-white" />
          </span>
          <span className={cx('hidden')}>Jerome Fitzgerald</span>
        </NextLink>
      </div>
      <div
        className={cx(
          'flex shrink grow basis-0 items-center justify-center bg-transparent',
          'ml-8',
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
              return (
                // @ts-ignore
                <NavigationMenu.Item
                  className={cx(
                    'cursor-pointer select-none text-base transition-colors',
                    // 'px-3 py-2',
                    '',
                    '',
                  )}
                  key={`nav--${menu.id}`}
                >
                  {menu.isParent ? (
                    <React.Fragment key={`nav--${menu.id}--p`}>
                      {/* @ts-ignore */}
                      <NavigationMenu.Trigger
                        className={cx(
                          'group flex items-center justify-center',
                          'rounded-full hover:bg-black/10',
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
                                'duration-250 relative top-[1px] mr-1 text-[var(--accent-a12)] transition-transform ease-in group-data-[state=open]:-rotate-180',
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
                              // 'border-b-1 border-solid border-black',
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
                                  {item.titleInfo}
                                </ListItem>
                              )
                            })}
                          </li>
                        </ul>
                      </NavigationMenu.Content>
                    </React.Fragment>
                  ) : (
                    <NextLink href={menu.href} legacyBehavior passHref>
                      <Text
                        asChild
                        className={cx(
                          'group flex items-center justify-center',
                          'rounded-full hover:bg-black/10',
                          'px-3 py-2',
                          'transition-colors',
                        )}
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
                'absolute',
                'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut   mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-sm border-2 shadow-xl transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]',
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
      </div>
    </>
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
          'group',
          'flex select-none flex-row items-center gap-3 p-3',
          'text-black dark:text-white',
          // ' hover:bg-black/10 dark:hover:bg-white/10',
          'hover:bg-[var(--gray-a2)]',
          'rounded-md px-3 py-2',
          className,
        )}
      >
        <>
          <div
            className={cx(
              // 'flex flex-col',
              'items-center justify-start',
              'mt-2 h-full',
              // 'hidden',
              '',
            )}
          >
            <Pencil2Icon
              aria-hidden
              className={cx('size-4 text-[currentColor]')}
              label={''}
            />
          </div>
          <div
            className={cx(
              'flex flex-col items-start justify-start',
              'mt-0 h-full',
              'group-hover:text-[var(--gray-12)]',
            )}
          >
            <Text
              as="div"
              className={cx(
                'mb-1 flex items-center gap-2 whitespace-nowrap text-[15px] font-medium text-[var(--gray12)]',
              )}
            >
              {title}
            </Text>
            <Text className={cx('line-clamp-2 text-sm')} highContrast>
              {children}
            </Text>
          </div>
        </>
      </NavigationMenu.Link>
    </NextLink>
  ),
)

export { NavigationMenuImpl as NavigationDesktop }
