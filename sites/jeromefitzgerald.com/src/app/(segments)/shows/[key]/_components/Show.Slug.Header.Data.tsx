import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import type { NotionTag } from '@/lib/drizzle/schemas/_notion/types'

// import { getShowData } from '@/app/(notion)/_config/index'
import { IdCardIcon, TagIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function ShowSlugHeaderData({ item }) {
  return (
    <>
      <Flex
        className={cx(
          'content-center items-center overflow-auto',
          'border-gray-7 border-t-1',
        )}
        direction="column"
        gap="0"
        justify="start"
        p="0"
        position="relative"
        width="100%"
        wrap="nowrap"
      >
        <DataList.Root
          className={cx(
            'py-6 pl-4 pr-1',
            'gap-x-[var(--space-3)] md:!gap-x-[var(--space-2)]',
            'w-full',
          )}
          size="2"
        >
          <DataList.Item align="start" className="hidden">
            <DataList.Label
              className="flex flex-row items-center justify-start gap-1"
              minWidth="0px"
            >
              <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
                <IdCardIcon />
                <Text className="font-mono md:!sr-only" ml="1" size="1">
                  Title
                </Text>
              </Flex>
            </DataList.Label>
            <DataList.Value className="font-mono">{item.title}</DataList.Value>
          </DataList.Item>
          {!!item.tags && (
            <DataList.Item align="start">
              <DataList.Label
                className="flex flex-row items-center justify-start gap-1"
                minWidth="0px"
              >
                <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
                  <TagIcon />
                  <Text className="font-mono md:!sr-only" ml="1" size="1">
                    Type
                  </Text>
                </Flex>
              </DataList.Label>
              <Flex
                asChild
                direction="row"
                gap={{ initial: '2', md: '3' }}
                ml={{ initial: '-2', md: '-3' }}
                wrap="wrap"
              >
                <DataList.Value
                  className={cx(
                    'place-content-start items-start',
                    'before:table before:[content:initial]',
                  )}
                >
                  <>
                    {item.tags.length === 0 && (
                      <Badge className="lowercase" color="amber" size="1">
                        <Code variant="ghost">comedy</Code>
                      </Badge>
                    )}
                    {item.tags.map(({ color, id, name }: NotionTag) => (
                      <Badge className="lowercase" color={color} key={id} size="1">
                        <Code variant="ghost">{name}</Code>
                      </Badge>
                    ))}
                  </>
                </DataList.Value>
              </Flex>
            </DataList.Item>
          )}
        </DataList.Root>
      </Flex>

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
            {/* <CTA href={ticketUrl} isDisabled={isEventOver} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export { ShowSlugHeaderData }
