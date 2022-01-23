import {
  Caption,
  Container,
  Section,
  Skeleton,
} from '@jeromefitz/design-system/components'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import { Breakout } from '~components/Container'

import { Image, ImageBlur, ImageContainer } from './ImageLead.styles'

const ImageWithBackgroundBlur = ({
  base64,
  description,
  image,
  priority = false,
  sizes = '(min-width: 1280) 80vh, 60vh',
  slug,
}) => {
  // console.dir(`image`)
  // console.dir(image)
  return (
    <ImageContainer>
      <ImageBlur
        css={{
          backgroundImage: `url(${base64})`,
          backgroundSize: 'cover',
          borderRadius: '$4',
        }}
      />
      <Image
        alt={description}
        blurDataURL={base64}
        // layout="intrinsic"
        layout="responsive"
        key={slug}
        placeholder="blur"
        priority={priority}
        quality={100}
        sizes={sizes}
        {...image}
      />
    </ImageContainer>
  )
}

const ImageSkeleton = () => {
  return (
    <ImageContainer css={{ height: '250px', width: '250px' }}>
      <Skeleton
        as="div"
        css={{
          height: '100%',
          width: '100%',
        }}
      >
        &nbsp;
      </Skeleton>
    </ImageContainer>
  )
}

const ImageLead = ({ breakout = true, description, image, imagesFallback }) => {
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', null)
  useEffectOnce(() => {
    void mutate('images', { ...images, ...imagesFallback }, true)
  })
  // @todo(external)
  // @note(notion) this is based off of seoImage only at the moment
  // @note(image) check against the first key in `images` only (seoImage)
  const imageSlug = Object.keys(image)[0]
  const imageData = !!images && images[imageSlug]

  // @note(image) verify it has been optimized
  // @todo(image) fallback base64
  const hasImage = !!imageData && !!imageData.base64

  if (!hasImage) {
    return null
  }

  const WrapComponent = breakout ? Breakout : Section

  return (
    <WrapComponent>
      <Container size="2">
        <ImageWithBackgroundBlur
          base64={imageData?.base64}
          description={description}
          image={imageData?.img}
          priority={true}
          slug={imageSlug}
        />
        <Caption>{description}</Caption>
      </Container>
    </WrapComponent>
  )
}

export { ImageSkeleton, ImageWithBackgroundBlur }
export default ImageLead
