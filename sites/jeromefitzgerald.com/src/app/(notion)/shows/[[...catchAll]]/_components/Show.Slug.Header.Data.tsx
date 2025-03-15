import { IdCardIcon, TagIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { getShowData } from '@/app/(notion)/_config/index'

function ShowSlugHeaderData({ properties }) {
  const { tags, title } = getShowData(properties)

  return (
    <>
      <Flex
        className={cx(
          // 'relative flex h-min w-full flex-col flex-nowrap content-center items-center justify-start gap-0 overflow-auto p-0',
          'border-gray-7 border-t-1',
        )}
        // conten/</>t="center"
        direction="column"
        justify="center"
        p="0"
        width="100%"
        wrap="nowrap"
      >
        <DataList.Root
          className={cx(
            'py-6 pr-1 pl-4',
            'gap-x-[var(--space-3)] md:!gap-x-[var(--space-1)]',
            'w-full',
          )}
          size="2"
        >
          <DataList.Item align="start" className="hidden">
            <DataList.Label
              className="flex flex-row items-center justify-start"
              minWidth="88px"
            >
              <IdCardIcon />
              <Text className="ml-2 font-mono" size="1">
                Title
              </Text>
            </DataList.Label>
            <DataList.Value className="font-mono">{title}</DataList.Value>
          </DataList.Item>
          {!!tags && (
            <DataList.Item align="start">
              <DataList.Label
                className="flex flex-row items-center justify-start"
                minWidth="88px"
              >
                <TagIcon />
                <Text className="ml-2 font-mono" size="1">
                  Type
                </Text>
              </DataList.Label>
              <DataList.Value
                className={cx(
                  'flex flex-none flex-row flex-wrap place-content-start items-start gap-2 md:gap-3',
                  'before:[content:initial]',
                  'before:table',
                  '',
                )}
              >
                <>
                  {tags.length === 0 && (
                    <Badge className="lowercase" color="amber" size="2">
                      <Code variant="ghost">comedy</Code>
                    </Badge>
                  )}
                  {tags.map(({ color, id, name }) => (
                    <Badge className="lowercase" color={color} key={id} size="2">
                      <Code variant="ghost">{name}</Code>
                    </Badge>
                  ))}
                </>
              </DataList.Value>
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
          // @note(ui) this moved to Portal for mobile (hydration error)...
          'hidden',
        )}
        id="header-bottom"
        style={{ opacity: 1, transform: 'perspective(1200px)' }}
      >
        <div className={cx('contents')}>
          <div className={cx('ml-0.5 w-full pb-2')}>
            {/* <CTA href={ticketUrl} isDisabled={isEventOver} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export { ShowSlugHeaderData }
