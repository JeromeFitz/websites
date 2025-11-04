import { AspectRatio, Flex, Grid, Text } from '@radix-ui/themes'

import { ImageClient as NextImage } from '@/components/Notion/Blocks/Image.client'

const imageCount = '4'

const ImageContainerGrid = ({ image }: { image: any }) => {
  return (
    <Grid columns={imageCount} gap="2" width="100%">
      <ImageMulti image={image} />
      <ImageMulti image={image} />
      <ImageMulti image={image} />
      <ImageMulti image={image} />
    </Grid>
  )
}

const ImageContainerFlex = ({ image }: { image: any }) => {
  return (
    <Flex gap="5" direction="column" align="center" justify="start">
      <Flex direction="row" gap="2" align="center" justify="center" width="100%">
        <ImageSingle image={image} />
      </Flex>
    </Flex>
  )
}

const ImageMulti = ({ image }: { image: any }) => {
  return (
    <Flex gap="5" direction="column" align="start" justify="start">
      <Flex direction="column" align="start" justify="start" width="100%">
        <ImageSingle image={image} />
      </Flex>
      <Text>Testing</Text>
    </Flex>
  )
}

const ImageSingle = ({ image }: { image: any }) => {
  return (
    <AspectRatio ratio={4 / 3}>
      <NextImage {...image} />
    </AspectRatio>
  )
}

const ImageContainer = ImageContainerFlex

export { ImageContainer, ImageMulti, ImageSingle }
