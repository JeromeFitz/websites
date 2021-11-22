import NextImage from 'next/image'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import { Breakout } from '~components/Container'
import ImageCaption from '~components/ImageCaption'
import { Container, Section, Skeleton } from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'

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

const ImageWithBackgroundBlur = ({
  base64,
  description,
  image,
  priority = false,
  sizes = '(min-width: 1280) 75vh, 50vh',
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
  const imageSlug = Object.keys(image)[0]
  const imageData = !!images && images[imageSlug]

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
        <ImageCaption caption={description} />
      </Container>
    </WrapComponent>
  )
}

export { ImageSkeleton, ImageWithBackgroundBlur }
export default ImageLead
