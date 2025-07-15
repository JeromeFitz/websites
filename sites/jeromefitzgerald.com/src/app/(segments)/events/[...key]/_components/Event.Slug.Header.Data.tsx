import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Portal } from '@radix-ui/themes/dist/esm/components/portal.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { isAfter } from 'date-fns/isAfter'
import NextLink from 'next/link'

import type { Event } from '@/lib/drizzle/schemas/cache-events/types'

import { DataList__Info } from '@/app/(segments)/events/[...key]/_components/Event.Data.List'
import { ExternalLinkIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

function CTA({ href, isDisabled = false }: { href: string; isDisabled: boolean }) {
  const title = isDisabled ? 'Event Has Passed' : 'Buy Tickets'
  const Component = isDisabled ? Text : NextLink

  return (
    <Flex asChild className="group" justify="between" py="4" width="100%">
      <Button
        asChild
        className={cx(
          '!transition-all',
          'hover:!-translate-y-2',
          '!shadow-xs hover:!shadow-lg',
          'dark:!shadow-accent-6',
          'data-[disabled="true"]:bg-gray-2 data-[disabled="true"]:hover:cursor-not-allowed',
          // 'data-[disabled="true"]:pointer-events-none',
          'data-[disabled="true"]:hover:!translate-y-0',
          'data-[disabled="true"]:hidden',
          'data-[disabled="true"]:!shadow-none',
          isDisabled && '!hidden',
          '!text-black',
        )}
        color="green"
        disabled={isDisabled}
        radius="small"
        size="4"
        variant="solid"
      >
        <Component href={href}>
          <Text className={cx(isDisabled && 'line-through')}>{title}</Text>
          <ExternalLinkIcon
            className={cx(
              // 'bg-blackA-9 group-hover:bg-blackA-10 ',
              'rounded-3 size-7 p-1 text-inherit !opacity-95 transition-colors group-hover:!opacity-100',
              '!transition-all',
              isDisabled && 'hidden',
            )}
          />
        </Component>
      </Button>
    </Flex>
  )
}

function EventSlugHeaderData({ item }: { item: Event }) {
  const isEventOver = isAfter(Date.now(), item.dateIso)
  const isNoTicketUrl = !item.urlTicket
  const isDisabled = isEventOver || isNoTicketUrl

  return (
    <>
      <DataList__Info isEventOver={isEventOver} item={item} />
      <div
        className={cx(
          'drop-shadow-md transition-all hover:drop-shadow-lg',
          'relative h-auto w-full flex-none',
          'fixed bottom-0 left-0 inline',
          'md:fixed md:bottom-0 md:left-0 md:flex md:h-min',
          'md:mb-[calc(var(--spacing)_*_11.5)]',
          // @note(ui) this moved to Portal for mobile (hydration error)...
          'hidden',
        )}
        id="header-bottom"
        style={{ opacity: 1, transform: 'perspective(1200px)' }}
      >
        <div className="contents size-full">
          <div className={cx('ml-0.5 w-full pb-2')}>
            <CTA href={item.urlTicket} isDisabled={isDisabled} />
          </div>
        </div>
      </div>
      {!isEventOver && (
        // @todo(next) NICE-117 causes hydration error on direct links
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Portal asChild>
          <Box
            bottom="0"
            className="z-40"
            display={{ md: 'none' }}
            id="portal--header--cta"
            left="0"
            position="fixed"
            width="100%"
          >
            <CTA href={item.urlTicket} isDisabled={isDisabled} />
          </Box>
        </Portal>
      )}
    </>
  )
}

export { EventSlugHeaderData }
