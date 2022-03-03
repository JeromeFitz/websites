import { Box, Grid } from '@jeromefitz/design-system/components'
import type { Episode as EpisodeProperties } from '@jeromefitz/notion/schema'
import _orderBy from 'lodash/orderBy'

// import { ContentNodes } from '@jeromefitz/shared/src/lib/notion/app'

import Card from './Card'

// @refactor(types)
// @refactor(types)
interface Icon {
  type: 'emoji'
  emoji: string
}
interface ItemDefault {
  archived: boolean
  cover: any
  created_time: string // date
  icon: Icon
  id: string
  last_edited_time: string // date
  url: string
}
interface Item extends ItemDefault {
  object: 'page'
  parent: any
  properties: EpisodeProperties
}
// type Items = Record<string, Item>
type Items = Item[]
const EpisodesListing = ({
  images,
  items,
}: // routeType,
{
  images: any
  items: Items
  // routeType: string
}) => {
  /**
   * @verify data
   */
  // const { data, images, routeType } = props
  // const { content } = data
  // const { results: _items } = data?.items
  // const items: Items = _items
  // @todo(404) fallback|404
  if (!items) return null

  /**
   * @sort items
   */
  const itemsSorted = _orderBy(
    items,
    ['properties.season', 'properties.episode'],
    ['desc', 'desc']
  )

  return (
    <Box>
      {/* <ContentNodes content={content} images={images} /> */}
      <Box css={{ px: '$2', py: '$6' }}>
        <Grid
          css={{
            rowGap: '$6',
            columnGap: '$6',
            gridTemplateColumns: 'repeat(1, 1fr)',
            '@bp1': { gridTemplateColumns: 'repeat(2, 1fr)' },
            '@bp2': { gridTemplateColumns: 'repeat(3, 1fr)' },
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
        >
          {itemsSorted.map((item) => {
            return <Card key={`card--${item.id}`} images={images} item={item} />
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default EpisodesListing
