import {
  // darkTheme,
  styled,
  // Box,
  Container,
  // Text,
  // Heading,
  // Flex,
  // Link,
  // Separator,
} from '@modulz/design-system'
// import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
// import { styled } from '@stitches/react'
// import { darkTheme, styled } from '@modulz/design-system'
// import cx from 'clsx'
import Slugger from 'github-slugger'
import NextImage from 'next/image'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import { Breakout } from '~components/Layout'
import ImageCaption from '~components/Notion/ImageCaption'

// // Exports
// const AspectRatio = AspectRatioPrimitive

const ImageContainer = styled('div', {
  position: 'relative',
  borderRadius: '$4',
})

const ImageBlur = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '99.9%',
  height: '99.9%',
  borderRadius: '$4',
  filter: 'blur(0.25rem) saturate(160%)',
  opacity: '.5',
  transform: 'scale(1.01)',
})

const Image = styled(NextImage, {
  borderRadius: '$4',
  position: 'relative',
  overflow: 'hidden',
})

const ImageLead = ({ description, image, imagesFallback }) => {
  const { mutate } = useSWRConfig()
  const slugger = new Slugger()
  const { data: images } = useSWR('images', null)
  useEffectOnce(() => {
    // console.dir(`useEffectOnce`)
    void mutate('images', { ...images, ...imagesFallback }, true)
  })
  // @todo(external)
  const imageSlug = slugger.slug(image)
  const imageData = !!images && images[imageSlug]

  // console.dir(`images`)
  // console.dir(images)
  // console.dir(`imagesFallback`)
  // console.dir(imagesFallback)
  // console.dir(`image`)
  // console.dir(image)
  // console.dir(`imageData`)
  // console.dir(imageData)

  const hasImage = !!imageData && !!imageData.base64

  if (!hasImage) {
    return null
  }

  return (
    <Breakout>
      {/* <CardWithGlow blurDataURL={imageData.base64} isImage={true}> */}
      <Container size="2">
        <ImageContainer>
          <ImageBlur
            css={{
              backgroundImage: `url(${imageData.base64})`,
              backgroundSize: 'cover',
              borderRadius: '$4',
            }}
          />
          <Image
            alt={description}
            blurDataURL={imageData?.base64}
            key={imageSlug}
            placeholder="blur"
            priority={true}
            title={description}
            {...imageData?.img}
          />
        </ImageContainer>
        <ImageCaption caption={description} />
      </Container>
      {/* </CardWithGlow> */}

      {/* </div>
        </div>
      </div> */}
    </Breakout>
  )
}

export default ImageLead
