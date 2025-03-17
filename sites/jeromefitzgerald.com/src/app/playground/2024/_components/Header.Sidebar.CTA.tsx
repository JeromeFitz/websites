import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

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
            className="group flex w-full justify-between py-8 hover:-translate-y-1"
            color="green"
            radius="small"
            size="4"
            variant="solid"
          >
            <NextLink href={href}>
              <Text>{title}</Text>
              <ArrowTopRightIcon
                className={cx(
                  'bg-blackA-9 group-hover:bg-blackA-10 rounded-3 size-6 p-1 text-inherit !opacity-100 transition-colors',
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
