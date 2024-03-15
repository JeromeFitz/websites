import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _map from 'lodash/map.js'
import _size from 'lodash/size.js'
import pluralize from 'pluralize'
import { Suspense } from 'react'

import { RelationsItems, RelationsLoading, getRelationTitle } from './index'

function RelationsWrapper({ children }) {
  return (
    <Grid columns={{ initial: '2', md: '3' }} gapX="3" gapY="6" width="100%">
      {children}
    </Grid>
  )
}
function RelationsColumn({ children }) {
  return <Box>{children}</Box>
}
function RelationsColumnTitle({ children }) {
  return (
    <Text className="text-gray-12 uppercase" weight="bold">
      {children}
    </Text>
  )
}
function RelationsColumnList({ children }) {
  return (
    <Box asChild mt="1" py="2">
      <ul className=" list-inside ">{children}</ul>
    </Box>
  )
}

function Relations({ id, relations }) {
  return (
    <RelationsWrapper>
      {_map(relations, (items, relation) => {
        if (!items) return null
        const itemsCount = _size(items)
        if (itemsCount === 0) return null
        const title = pluralize(getRelationTitle(relation), itemsCount)
        return (
          <RelationsColumn key={`relations--${id}--${relation}`}>
            <RelationsColumnTitle>{title}</RelationsColumnTitle>
            <RelationsColumnList>
              <Suspense fallback={<RelationsLoading size={itemsCount} />}>
                <RelationsItems items={items} />
                {/* <RelationsLoading size={itemsCount} /> */}
              </Suspense>
            </RelationsColumnList>
          </RelationsColumn>
        )
      })}
    </RelationsWrapper>
  )
}

export { Relations }
