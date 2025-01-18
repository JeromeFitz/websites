// import { InfoCircledIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
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
    <Box
      className={cx(
        'relative flex h-min w-full flex-none flex-col flex-nowrap place-content-center items-center gap-0 overflow-visible p-0',
        'z-0',
      )}
      id="container--credits"
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
    </Box>
  )
}

function RelationContainer({ children }) {
  return (
    <Box
      className={cx(
        'relative flex h-auto w-[1px] flex-col flex-nowrap content-center items-stretch justify-start gap-0 overflow-hidden p-0',
        'min-w-[300px]',
        // 'flex-[1_0_0px]',
        'flex-auto',
      )}
    >
      {children}
    </Box>
  )
}

function RelationContainerContent({ children }) {
  return (
    <Box
      className={cx(
        'relative flex h-min w-full flex-none flex-col flex-nowrap place-content-start items-start gap-4 overflow-visible px-5 py-8',
        'bg-accentA-2',
        // 'border-gray-7 border-1 border-l-0 border-t-0',
        'md:h-full',
      )}
    >
      {children}
    </Box>
  )
}

function RelationContainerTitle({ children, className = '' }) {
  return (
    <Box
      className={cx(
        'relative h-16 w-full flex-none p-4',
        'px-5 pb-8 pt-5',
        'border-gray-7 border-y-1',
        className,
      )}
    >
      <Box className={cx('contents')}>
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
    <Box
      className={cx(
        // 'bg-accent-2',
        'size-full items-stretch',
        'rounded-3 relative z-10 flex h-min w-full flex-row place-content-start items-start gap-0 overflow-hidden p-0',
        // 'flex-none flex-row flex-nowrap',
        'flex-row flex-wrap',
        'border-1 border-gray-7',
        // 'border-t-1 rounded-t-[0]',
        'rounded-t-[0] border-t-0',
      )}
      id="container--credits--content"
    >
      {children}
    </Box>
  )
}

export { Credits }
