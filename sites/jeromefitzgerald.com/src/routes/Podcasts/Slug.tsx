import { Box } from '@jeromefitz/design-system'
import type { Podcast as PodcastProperties } from '@jeromefitz/notion/schema'
import { ImageLead } from '@jeromefitz/shared/src/components'
import { ContentNodes } from 'next-notion/src/app'

import Episodes from '../Episodes/Listing'

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
  // console.dir(`> PodcastsSlug: Note PODCASTS and EPISODES SLUG isthis`)
  // console.dir(props)
  const { data, images } = props
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
      <Episodes images={images} items={items?.results} />
    </Box>
  )
}

export default PodcastsSlug
