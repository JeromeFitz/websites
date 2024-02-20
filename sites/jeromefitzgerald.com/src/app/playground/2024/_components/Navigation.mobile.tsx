/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { ChevronDownIcon, Pencil2Icon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as Accordion from '@radix-ui/react-accordion'
import * as Portal from '@radix-ui/react-portal'
import { Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import React from 'react'

import { useStore } from '~store/index'

const useStoreMenu = () => {
  return useStore((store) => ({
    isMenuOpen: store.isMenuOpen,
    isMenuOpenSet: store.isMenuOpenSet,
  }))
}

function AccordionList({ children }) {
  return <ul className={cx('m-0 mb-3 list-none p-0')}>{children}</ul>
}

function AccordionListItem({ children }) {
  const { isMenuOpen, isMenuOpenSet } = useStoreMenu()
  const handleOnClick = () => {
    if (!isMenuOpen) {
      document.body.classList.add('!overflow-hidden')
    } else {
      document.body.classList.remove('!overflow-hidden')
    }
    isMenuOpenSet()
  }
  return (
    <NextLink
      className={cx('cursor-pointer text-inherit no-underline')}
      href={'/playground/2024'}
      onClick={handleOnClick}
    >
      <li
        className={cx(
          'cursor-pointer no-underline',
          'text-[var(--gray-11)]',
          'flex w-full select-none flex-row items-center justify-start',
          'transition-colors',
          'my-1 gap-2 py-1',
          'md:my-1 md:gap-3 md:py-2',
          'rounded hover:bg-[var(--gray-4)] hover:text-[var(--gray-12)]',
        )}
      >
        <Pencil2Icon
          aria-hidden
          className={cx('ml-1 size-4 min-w-4 text-[currentColor] md:ml-2')}
          label={''}
        />
        <span className="truncate text-base">{children}</span>
      </li>
    </NextLink>
  )
}

const AccordionDemo = () => {
  return (
    // @ts-ignore
    <Accordion.Root
      className={cx(
        'mt-10 min-w-full max-w-full',
        'w-[300px] rounded-md bg-[var(--gray-6)]',
        'shadow-[0_2px_10px] shadow-black/5 dark:shadow-white/10',
        'border-1 border-black/5 dark:border-white/10',
      )}
      collapsible
      defaultValue="item-1"
      type="single"
    >
      {/* @ts-ignore */}
      <AccordionItem value="item-1">
        {/* @ts-ignore */}
        <AccordionTrigger>Upcoming Events</AccordionTrigger>
        {/* @ts-ignore */}
        <AccordionContent>
          <AccordionList>
            <AccordionListItem>No Events Scheduled</AccordionListItem>
            <AccordionListItem>… Past Events</AccordionListItem>
          </AccordionList>
        </AccordionContent>
      </AccordionItem>
      {/* @ts-ignore */}
      <AccordionItem value="item-2">
        {/* @ts-ignore */}
        <AccordionTrigger>Shows</AccordionTrigger>
        {/* @ts-ignore */}
        <AccordionContent>
          <AccordionList>
            <AccordionListItem>Alex O’Jerome</AccordionListItem>
            <AccordionListItem>Bubble Boy: The Musical</AccordionListItem>
            <AccordionListItem>JFLE (Jerome & Jesse LE)</AccordionListItem>
            <AccordionListItem>Justin & Jerome Experience</AccordionListItem>
            <AccordionListItem>My Dinner With André: The Musical</AccordionListItem>
            <AccordionListItem>The Death Show</AccordionListItem>
            <AccordionListItem>The Playlist</AccordionListItem>
            <AccordionListItem>Warp Zone</AccordionListItem>
            <AccordionListItem>… All Shows</AccordionListItem>
          </AccordionList>
        </AccordionContent>
      </AccordionItem>
      {/* @ts-ignore */}
      <AccordionItem value="item-3">
        {/* @ts-ignore */}
        <AccordionTrigger>Podcasts</AccordionTrigger>
        {/* @ts-ignore */}
        <AccordionContent>
          <AccordionList>
            <AccordionListItem>Knockoffs</AccordionListItem>
            <AccordionListItem>Jer & Ky & Guest</AccordionListItem>
            <AccordionListItem>J. Pitts Show</AccordionListItem>
            <AccordionListItem>… All Podcast Features</AccordionListItem>
          </AccordionList>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  )
}

const AccordionItem = React.forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cx(
        'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0.25px] focus-within:shadow-[var(--accent-12)]',
        className,
      )}
      {...props}
      // @ts-ignore
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
)

const AccordionTrigger = React.forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    // @ts-ignore
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cx(
          'group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none text-[var(--accent-11)] shadow-[0_1px_0] shadow-[var(--gray-6)] outline-none hover:bg-[var(--gray-2)] dark:bg-black/95',
          className,
        )}
        {...props}
        // @ts-ignore
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="text-[var(--accent-10)] transition-transform group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

const AccordionContent = React.forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cx(
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden bg-[var(--gray-2)] text-[15px] text-[var(--gray-11)]',
        className,
      )}
      {...props}
      // @ts-ignore
      ref={forwardedRef}
    >
      <div className="px-5 py-[15px]">{children}</div>
    </Accordion.Content>
  ),
)

function NavigationMobile() {
  const { isMenuOpen, isMenuOpenSet } = useStoreMenu()
  const handleOnClick = () => {
    if (!isMenuOpen) {
      document.body.classList.add('!overflow-hidden')
    } else {
      document.body.classList.remove('!overflow-hidden')
    }
    isMenuOpenSet()
  }
  return (
    <>
      <div
        className={cx(
          'col-span-4 flex cursor-pointer items-center justify-end md:hidden',
        )}
        onClick={handleOnClick}
      >
        {isMenuOpen ? `Close` : `Open`} Menu
      </div>

      {isMenuOpen && (
        // @ts-ignore
        <Portal.Root>
          <nav
            className={cx(
              // '[--header-height:57px]',
              'top-[calc(var(--header-height)_-_0px)]',
              // 'top-1',
              'fixed inset-x-0 bottom-0 size-full max-w-[100vw]',
              // 'bg-[var(--gray-a1)] backdrop-blur-sm',
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
                <li
                  className={cx(
                    'flex w-full cursor-pointer select-none items-center transition-colors',
                  )}
                >
                  <Button
                    className={cx('h-10 min-w-full max-w-full px-4')}
                    color="pink"
                    onClick={isMenuOpenSet}
                    size="4"
                    variant="surface"
                  >
                    Contact
                  </Button>
                </li>
              </ul>
              <AccordionDemo />
            </div>
          </nav>
        </Portal.Root>
      )}
    </>
  )
}

export { NavigationMobile }
