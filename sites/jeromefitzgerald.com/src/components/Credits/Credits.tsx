import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _map from 'lodash/map.js'
import _size from 'lodash/size.js'
import pluralize from 'pluralize'
import { Fragment, Suspense } from 'react'

import { UL } from '@/components/List/index'
import { cx } from '@/utils/cx'

// import { CreditsHeader } from './Credits.Header'
import { CreditsItems } from './Credits.Items'
import { CreditsLoading } from './Credits.Loading'
import { getRollupTitle } from './Credits.utils'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function Credits({ id, relations }) {
  return (
    <Flex
      className={cx('place-content-center items-center overflow-visible', 'z-0')}
      direction="column"
      flexBasis="auto"
      flexGrow="0"
      flexShrink="0"
      gap="0"
      height="min-content"
      id="container--credits"
      p="0"
      position="relative"
      width="100%"
      wrap="nowrap"
    >
      {/* <CreditsHeader /> */}
      <RelationsContainer>
        {_map(relations, (_items, relation) => {
          if (!_items) return null
          const itemsCount = _size(_items)
          if (itemsCount === 0 || _items[0] === '') return null
          /**
           * @todo(dynamic-credits)
           * title only? simple sort is good
           * has data? utilize suspense
           */
          const items = _items.sort()
          const title = pluralize(getRollupTitle(relation), itemsCount)
          const key = `relations--${id}--${relation}`
          return (
            <Fragment key={key}>
              <RelationContainer>
                <RelationContainerTitle>{title}</RelationContainerTitle>
                <RelationContainerContent>
                  <UL>
                    <Suspense fallback={<CreditsLoading size={itemsCount} />}>
                      <CreditsItems items={items} />
                    </Suspense>
                  </UL>
                </RelationContainerContent>
              </RelationContainer>
            </Fragment>
          )
        })}
      </RelationsContainer>
    </Flex>
  )
}

function RelationContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      className="flex-auto content-center items-stretch overflow-hidden"
      direction="column"
      gap="0"
      height="auto"
      justify="start"
      minWidth="300px"
      p="0"
      position="relative"
      width="1px"
      wrap="nowrap"
    >
      {children}
    </Flex>
  )
}

function RelationContainerContent({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      className="place-content-start items-start overflow-visible"
      direction="column"
      gap="4"
      height={{ initial: 'min-content', md: '100%' }}
      position="relative"
      px="5"
      py="8"
      width="100%"
      wrap="nowrap"
    >
      {children}
    </Flex>
  )
}

function RelationContainerTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Box
      className={cx(
        'border-gray-7 border-y-1 bg-[var(--color-background)]',
        className,
      )}
      flexBasis="auto"
      flexGrow="0"
      flexShrink="0"
      height="calc(var(--spacing) * 16)"
      p="4"
      pb="8"
      position="relative"
      pt="5"
      px="5"
      width="100%"
    >
      <Box className="contents size-full">
        <Flex className="items-center" direction="row" gap="4" justify="start">
          <Text className="font-medium capitalize" size={{ initial: '3', md: '5' }}>
            {children}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

/**
 * @todo(css) figure out grid for this better please...
 */
function RelationsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      className={cx(
        'items-stretch',
        'rounded-3 z-10 place-content-start items-start overflow-hidden',
        'border-gray-7 border-1 rounded-t-[0] border-t-0',
        'bg-accentA-2',
      )}
      direction="row"
      gap="0"
      height="min-content"
      id="container--credits--content"
      p="0"
      position="relative"
      width="100%"
      wrap="wrap"
    >
      {children}
    </Flex>
  )
}

export { Credits }
