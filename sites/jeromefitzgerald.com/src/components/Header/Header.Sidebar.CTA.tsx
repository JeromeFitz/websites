import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import NextLink from 'next/link'

import { ExternalLinkIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

function HeaderSidebarCTA({
  href = 'https://www.showclix.com/event/latchkey-2405',
  title = 'Buy Ticket',
}) {
  return (
    <div
      className={cx(
        'drop-shadow-md transition-all hover:drop-shadow-lg',
        'h-auto w-full flex-none',
        'relative bottom-0 left-0 flex',
        'md:fixed',
      )}
      id="header-bottom"
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      <div className="contents size-full">
        <div className={cx('w-full p-2')}>
          <Button
            asChild
            className="group hover:-translate-y-1 flex w-full justify-between py-8"
            color="green"
            radius="small"
            size="4"
            variant="solid"
          >
            <NextLink href={href}>
              <Text>{title}</Text>
              <ExternalLinkIcon
                className={cx(
                  '!opacity-100 size-6 rounded-3 bg-blackA-9 p-1 text-inherit transition-colors group-hover:bg-blackA-10',
                )}
              />
            </NextLink>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { HeaderSidebarCTA }
