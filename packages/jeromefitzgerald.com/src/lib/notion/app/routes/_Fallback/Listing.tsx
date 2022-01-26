import { Box } from '@jeromefitz/design-system/components'

import { ContentNodes } from '~lib/notion/app'

const FallbackListing = ({ ...props }) => {
  const { content, images } = props

  return (
    <Box>
      <ContentNodes content={content} images={images} />
      <h1>FallbackListing: {props.routerNode}</h1>
    </Box>
  )
}

export default FallbackListing
