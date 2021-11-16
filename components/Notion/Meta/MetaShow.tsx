import _map from 'lodash/map'
import _size from 'lodash/size'
// import _sortBy from 'lodash/sortBy'
import _startsWith from 'lodash/startsWith'
import pluralize from 'pluralize'
// import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

import fetcher from '~lib/fetcher'
import getTitle from '~lib/notion/getTitle'
import { Box, Flex, Grid, Heading, Paragraph, Text } from '~styles/system/components'

const rollupExclude = [
  // 'rollupCastPast',
  'rollupVenue',
  'rollupTags',
  'rollupTagsSecondary',
  'rollupShow',
]

const MetaShow = ({ data, routeType }) => {
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

  // console.dir(`rollupKeys`)
  // console.dir(rollupKeys)

  if (size === 0) return null

  return (
    <>
      <Box css={{ my: '$8' }}>
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

            return (
              <Rollup
                _key={key}
                data={_data}
                key={key}
                rollupKey={rollupKey}
                routeType={routeType}
              />
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

const Rollup = ({ _key, data, rollupKey, routeType }) => {
  const meta = data[rollupKey]
  const metaSize = _size(meta)
  const title = pluralize(getTitle(rollupKey), metaSize)

  return (
    <>
      <Flex
        direction="column"
        css={{
          gridColumnStart: 'span 2',
          '@bp1': { gridColumnStart: metaSize > 4 ? 'span 2' : 'span 1' },
        }}
      >
        <Heading size="3" css={{ borderTop: '1px solid $hiContrast', py: '$3' }}>
          {title}
        </Heading>
        <Box as="ul">
          {_map(meta, (item, itemIdx) => {
            const keySub = `${_key}-${itemIdx}`
            if (rollupKey === 'rollupCast' && routeType === 'events') {
              return <Cast data={data} key={keySub} />
            }
            return (
              <Box as="li" key={keySub} css={{}}>
                <Paragraph size="2">{item}</Paragraph>
              </Box>
            )
          })}
        </Box>
      </Flex>
    </>
  )
}

const Cast = ({ data }) => {
  const { data: showData } = useSWRImmutable(
    [`/api/notion/pages/${data?.shows[0]}`],
    (url) => fetcher(url),
    {}
  )
  const cast = showData?.data?.rollupCast
  if (!cast) return null
  return (
    <>
      {_map(cast, (item, itemIdx) => {
        return (
          <Box as="li" css={{}} key={`iiii-${itemIdx}`}>
            <Paragraph size="2">{item}</Paragraph>
          </Box>
        )
      })}
    </>
  )
}

export default MetaShow
