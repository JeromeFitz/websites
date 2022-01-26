import { Box } from '@jeromefitz/design-system/components'

import { ContentNodes } from '~components/Notion'

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
