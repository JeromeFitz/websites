import { ArrowRightIcon } from '@radix-ui/react-icons'
// import _filter from 'lodash/filter'
// import _includes from 'lodash/includes'
import _map from 'lodash/map'
import _size from 'lodash/size'
import _startsWith from 'lodash/startsWith'
// import _union from 'lodash/union'
// import _uniqWith from 'lodash/uniqWith'
import pluralize from 'pluralize'
import { Fragment } from 'react'

import getTitle from '~lib/notion/getTitle'
import { Box, Flex, Grid, Heading, Paragraph, Text } from '~styles/system/components'
import { MarketingButton } from '~styles/system/components/Button/MarketingButton'
const MetaShow = ({ data }) => {
  const _data = data?.info?.data
  const rollupKeys = []
  _map(
    Object.keys(_data),
    (k) =>
      _startsWith(k, 'rollup') &&
      !['rollupVenue', 'rollupTags', 'rollupShow'].includes(k) &&
      rollupKeys.push(k)
  )

  return (
    <>
      <Box css={{ my: '$8' }}>
        <Flex justify={{ '@initial': 'start' }} gap="5">
          {_data?.ticketUrl ? (
            <MarketingButton as="a" href={_data?.ticketUrl} icon={ArrowRightIcon}>
              Get Tickets
            </MarketingButton>
          ) : (
            <MarketingButton
              as="button"
              css={{ cursor: 'not-allowed !important' }}
              disabled={true}
              icon={ArrowRightIcon}
            >
              Get Tickets
            </MarketingButton>
          )}
        </Flex>

        <Text
          css={{
            borderTop: '1px solid $hiContrast',
            fontSize: '$9',
            fontWeight: 700,
            mt: '$6',
            mb: '$4',
            pt: '$6',
            pb: '$4',
          }}
        >
          Info
        </Text>

        <Grid
          css={{
            rowGap: '$7',
            columnGap: '$4',
            gridTemplateColumns: 'repeat(2, 1fr)',
            '@bp1': { gridTemplateColumns: 'repeat(3, 1fr)' },
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
        >
          {_map(rollupKeys, (rollupKey, rollupKeyIdx) => {
            const meta = _data[rollupKey]
            const metaSize = _size(meta)
            if (!meta || metaSize === 0) return null

            const key = `rollupKey-${rollupKeyIdx}`
            const title = pluralize(getTitle(rollupKey), metaSize)

            // if (rollupKey === 'rollupLineup') {
            //   meta.unshift(_data['rollupShow'])
            // }

            return (
              <Fragment key={key}>
                <Flex
                  direction="column"
                  css={{
                    gridColumnStart: 'span 2',
                    '@bp1': { gridColumnStart: metaSize > 4 ? 'span 2' : 'span 1' },
                  }}
                >
                  <Heading
                    size="3"
                    css={{ borderTop: '1px solid $hiContrast', py: '$3' }}
                  >
                    {title}
                  </Heading>
                  <Box as="ul">
                    {_map(meta, (item, itemIdx) => {
                      const keySub = `${key}-${itemIdx}`
                      return (
                        <Box as="li" key={keySub} css={{}}>
                          <Paragraph size="2">{item}</Paragraph>
                        </Box>
                      )
                    })}
                  </Box>
                </Flex>
              </Fragment>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default MetaShow
