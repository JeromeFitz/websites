import _map from 'lodash/map'
import _size from 'lodash/size'
import _startsWith from 'lodash/startsWith'
import pluralize from 'pluralize'

import getTitle from '~lib/notion/getTitle'
import { Box, Flex, Grid, Heading, Paragraph, Text } from '~styles/system/components'

const rollupExclude = [
  'rollupVenue',
  'rollupTags',
  'rollupTagsSecondary',
  'rollupShow',
]

const MetaShow = ({ data, key }) => {
  const { id } = data?.info
  const _data = data?.info?.data
  const rollupKeys = []
  _map(
    Object.keys(_data),
    (k) =>
      _startsWith(k, 'rollup') && !rollupExclude.includes(k) && rollupKeys.push(k)
  )

  let size = 0
  _map(rollupKeys, (r) => (size = size + _size(_data[r])))
  if (size === 0) return null

  return (
    <>
      <Box css={{ my: '$8' }} key={`${key}--box`}>
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
            if (!meta || metaSize === 0 || rollupExclude.includes(rollupKey))
              return null

            const key = `${id}-rollupKey-${rollupKeyIdx}`
            const title = pluralize(getTitle(rollupKey), metaSize)

            // if (rollupKey === 'rollupLineup') {
            //   meta.unshift(_data['rollupShow'])
            // }

            return (
              <Flex
                direction="column"
                css={{
                  gridColumnStart: 'span 2',
                  '@bp1': { gridColumnStart: metaSize > 4 ? 'span 2' : 'span 1' },
                }}
                key={key}
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
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default MetaShow
