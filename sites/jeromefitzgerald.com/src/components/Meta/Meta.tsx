import {
  Box,
  Flex,
  Grid,
  Heading,
  Paragraph,
  Text,
} from '@jeromefitz/design-system/components'
import { PROPERTIES } from '@jeromefitz/notion/constants'
import type { Show } from '@jeromefitz/notion/schema'
import getTitle from '@jeromefitz/notion/utils/getTitle'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import _sortBy from 'lodash/sortBy'
import _startsWith from 'lodash/startsWith'
import { fetcher } from 'next-notion/src/lib/fetcher'
import pluralize from 'pluralize'
import useSWRImmutable from 'swr/immutable'

import { notionConfig } from '~config/index'

const { NOTION } = notionConfig

const rollupExclude = [
  // PROPERTIES.rollupEvents__People_Guest_Music.key,
  PROPERTIES.rollupEvents__Shows.key,
  PROPERTIES.rollupEvents__Venues.key,
  PROPERTIES.rollupShows__People_Cast_Slug.key,
  PROPERTIES.rollupShows__Tags.key,
]

const Meta = ({ data, routeType }) => {
  const { id } = data?.info
  const properties = data?.info?.properties
  const rollupKeys = []
  _map(
    Object.keys(properties),
    (k) =>
      _startsWith(k, 'rollup') && !rollupExclude.includes(k) && rollupKeys.push(k)
  )

  let size = 0
  _map(rollupKeys, (r) => (size = size + _size(properties[r])))

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
            const meta = properties[rollupKey]
            const metaSize = _size(meta)
            if (!meta || metaSize === 0 || rollupExclude.includes(rollupKey))
              return null

            const key = `${id}-rollupKey-${rollupKeyIdx}`

            return (
              <Rollup
                _key={key}
                data={properties}
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
            if (
              rollupKey === PROPERTIES.rollupEvents__People_Cast.key &&
              routeType === NOTION.EVENTS.routeType
            ) {
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

/**
 * @custom(notion) get the cast of the "first" show
 */
const Cast = ({ data }) => {
  const { data: showData } = useSWRImmutable<Show>(
    [`/api/v1/cms/pages/${data?.relationEvents__Shows[0]}`],
    (url) => fetcher(url),
    {}
  )

  const cast = showData?.rollupShows__People_Cast
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

export default Meta
