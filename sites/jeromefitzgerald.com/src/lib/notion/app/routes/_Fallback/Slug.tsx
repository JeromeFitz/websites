import { Box } from '@jeromefitz/design-system/components'
import { ContentNodes } from '@jeromefitz/shared/src/lib/notion/app'

import { ImageLead } from '~components/Layout'

const FallbackSlug = ({ ...props }) => {
  // console.dir(`> FallbackSlug`)
  // console.dir(props)
  const { content, images, info } = props
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
    </Box>
  )
}

export default FallbackSlug
