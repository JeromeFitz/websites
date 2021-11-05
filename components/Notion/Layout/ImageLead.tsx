import Slugger from 'github-slugger'
import NextImage from 'next/image'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import { Breakout } from '~components/Layout'
import ImageCaption from '~components/Notion/ImageCaption'
import { Container } from '~styles/system/components/Container'
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

const ImageWithBackgroundBlur = ({ base64, description, image, slug }) => {
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
        key={slug}
        placeholder="blur"
        priority={true}
        title={description}
        {...image}
      />
    </ImageContainer>
  )
}

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
      <Container size="2">
        <ImageWithBackgroundBlur
          base64={imageData?.base64}
          description={description}
          image={imageData?.img}
          slug={imageSlug}
        />
        <ImageCaption caption={description} />
      </Container>
    </Breakout>
  )
}

export { ImageWithBackgroundBlur }
export default ImageLead
