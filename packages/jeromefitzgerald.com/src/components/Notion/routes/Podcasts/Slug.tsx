import { Box } from '@jeromefitz/design-system/components'
import type { Podcast as PodcastProperties } from '@jeromefitz/notion/schema'

import Episodes from '../Episodes/Listing'

import { ImageLead } from '~components/Layout'
import { ContentNodes } from '~components/Notion'

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
  properties: PodcastProperties
}

// @todo(types)
const PodcastsSlug = (props) => {
  // console.dir(`> PodcastsSlug`)
  // console.dir(props)
  const { data, images, routeType } = props
  const { content, info, items }: { content: any; info: Item; items: any } = data
  const { id, properties } = info

  return (
    <Box>
      <ImageLead
        description={properties?.seoImageDescription || ''}
        image={properties?.seoImage}
        images={images}
        key={`image-lead--${id}`}
      />
      <ContentNodes content={content} images={images} />
      <Episodes images={images} items={items?.results} routeType={routeType} />
    </Box>
  )
}

export default PodcastsSlug
