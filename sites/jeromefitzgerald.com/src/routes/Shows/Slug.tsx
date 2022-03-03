import { Box } from '@jeromefitz/design-system/components'
import type { Show } from '@jeromefitz/notion/schema'
import { ContentNodes } from '@jeromefitz/shared/src/lib/notion/app'

import { ImageLead } from '~components/Layout'
import Meta from '~components/Meta'

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
  properties: Show
}

// @todo(types)
const ShowsSlug = (props: { data: any; images: any; routeType: any }) => {
  const { data, images, routeType } = props
  const { content, info }: { content: any; info: Item } = data
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
      <Meta data={data} key={`${id}--meta`} routeType={routeType} />
    </Box>
  )
}

export default ShowsSlug
