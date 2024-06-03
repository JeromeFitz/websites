// import { InfoCircledIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
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
  return (
    <Box
      className={cx(
        'relative flex h-min w-full flex-none flex-col flex-nowrap content-center items-center justify-center gap-0 overflow-visible p-0',
        'z-0',
      )}
      id="container--credits"
    >
      <CreditsHeader />
      <Box
        className={cx(
          // 'bg-accent-2',
          'size-full items-stretch',
          'rounded-3 relative z-10 flex h-min w-full flex-row content-start items-start justify-start gap-0 overflow-hidden p-0',
          // 'flex-none flex-row flex-nowrap',
          'flex-row flex-wrap',
          'border-1 border-gray-7',
          // 'border-t-1 rounded-t-[0]',
          'rounded-t-[0] border-t-0',
        )}
        id="container--credits--content"
      >
        {_map(relations, (items, relation) => {
          if (!items) return null
          const itemsCount = _size(items)
          if (itemsCount === 0) return null
          const title = pluralize(getRelationTitle(relation), itemsCount)
          const key = `relations--${id}--${relation}`
          // console.dir(`title: ${title}`)
          return (
            <Fragment key={key}>
              <Box
                className={cx(
                  'relative flex h-auto w-[1px] flex-col flex-nowrap content-center items-stretch justify-start gap-0 overflow-hidden p-0',
                  'min-w-[300px]',
                  // 'flex-[1_0_0px]',
                  'flex-auto',
                )}
                key={`c1-${relation}`}
              >
                <Box
                  className={cx(
                    'relative h-16 w-full flex-none p-4',
                    'px-5 pb-8 pt-5',
                    'border-gray-7 border-y-1',
                  )}
                >
                  <Box className={cx('contents')}>
                    <Box
                      className={cx(
                        'flex flex-row items-center justify-start gap-4',
                      )}
                    >
                      {/* <InfoCircledIcon /> */}
                      <Text
                        className="font-medium capitalize"
                        size={{ initial: '3', md: '5' }}
                      >
                        {title}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className={cx(
                    'relative flex h-min w-full flex-none flex-col flex-nowrap content-start items-start justify-start gap-4 overflow-visible px-5 py-8',
                    'bg-accentA-2',
                    // 'border-gray-7 border-1 border-l-0 border-t-0',
                    'md:h-full',
                  )}
                >
                  <UL>
                    <Suspense fallback={<CreditsLoading size={itemsCount} />}>
                      <CreditsItems items={items} />
                    </Suspense>
                  </UL>
                </Box>
              </Box>
            </Fragment>
          )
        })}
      </Box>
    </Box>
  )
}

export { Credits }
