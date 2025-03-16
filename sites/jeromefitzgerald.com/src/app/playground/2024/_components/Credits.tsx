// import { InfoCircledIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _map from 'lodash/map.js'
import _size from 'lodash/size.js'
import pluralize from 'pluralize'
import { Fragment, Suspense } from 'react'

import { UL } from '@/components/List/index'

import { CreditsHeader } from './Credits.Header'
import { CreditsItems } from './Credits.Items'
import { CreditsLoading } from './Credits.Loading'
import { getRelationTitle } from './Credits.utils'

function Credits({ id, relations }) {
  let relationsSize = 0
  let relationAddition = 0
  return (
    <Flex
      className={cx(
        'flex-none place-content-center items-center overflow-visible',
        'z-0',
      )}
      direction="column"
      gap="0"
      height="min-content"
      id="container--credits"
      p="0"
      position="relative"
      width="100%"
      wrap="nowrap"
    >
      <CreditsHeader />
      <RelationsContainer>
        {_map(relations, (items, relation) => {
          if (!items) return null
          const itemsCount = _size(items)
          if (itemsCount === 0) return null
          relationsSize++
          relationAddition = relationsSize % 3
          // console.dir(`relationsSize: ${relationsSize}`)
          // console.dir(`relationAddition: ${relationAddition}`)
          // console.dir(relationsSize % 3)
          const title = pluralize(getRelationTitle(relation), itemsCount)
          const key = `relations--${id}--${relation}`
          // console.dir(`title: ${title}`)
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
        {relationAddition === 1 && (
          <>
            <RelationContainer>
              <RelationContainerTitle className="hidden md:flex">{` `}</RelationContainerTitle>
              <RelationContainerContent>{` `}</RelationContainerContent>
            </RelationContainer>
            <RelationContainer>
              <RelationContainerTitle className="hidden md:flex">{` `}</RelationContainerTitle>
              <RelationContainerContent>{` `}</RelationContainerContent>
            </RelationContainer>
          </>
        )}
        {relationAddition === 2 && (
          <RelationContainer>
            <RelationContainerTitle className="hidden md:flex">{` `}</RelationContainerTitle>
            <RelationContainerContent>{` `}</RelationContainerContent>
          </RelationContainer>
        )}
      </RelationsContainer>
    </Flex>
  )
}

function RelationContainer({ children }) {
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

function RelationContainerContent({ children }) {
  return (
    <Flex
      className="bg-accentA-2 place-content-start items-start overflow-visible"
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

function RelationContainerTitle({ children, className = '' }) {
  return (
    <Box
      className={cx(
        'relative h-16 w-full flex-none p-4',
        'px-5 pt-5 pb-8',
        'border-gray-7 border-y-1',
        className,
      )}
    >
      <Box className="contents size-full">
        <Box className={cx('flex flex-row items-center justify-start gap-4')}>
          {/* <InfoCircledIcon /> */}
          <Text className="font-medium capitalize" size={{ initial: '3', md: '5' }}>
            {children}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * @todo(css) figure out grid for this better please...
 */
function RelationsContainer({ children }) {
  return (
    <Flex
      className={cx(
        'items-stretch',
        'rounded-3 z-10 place-content-start items-start overflow-hidden',
        'border-gray-7 rounded-t-[0] border-1 border-t-0',
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
