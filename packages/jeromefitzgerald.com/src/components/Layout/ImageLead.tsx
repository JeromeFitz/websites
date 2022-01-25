import {
  Breakout,
  Caption,
  Container,
  Section,
  Skeleton,
} from '@jeromefitz/design-system/components'
import _isEmpty from 'lodash/isEmpty'
import useSWR from 'swr'

import fetcher from '~lib/fetcher'

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

const ImageLead = ({ breakout = true, description, image, images }) => {
  // @note(notion) this is based off of seoImage only at the moment
  // @note(image) check against the first key in `images` only (seoImage)
  const imageSlug = !!image && Object.keys(image)[0]
  const url = !!imageSlug && image[imageSlug]?.url
  const fallbackData = !!url && !!images ? images[imageSlug] : {}
  // @note(image) do not call if we do not need to
  const urlApi = !!url && _isEmpty(fallbackData) ? `/api/images?url=${url}` : null

  const { data } = useSWR<any>(urlApi, fetcher, {
    fallbackData,
  })

  // @note(image) verify it has been optimized
  // @todo(image) fallback base64
  const hasImage = !!data && !!data?.base64

  if (!hasImage) {
    return null
  }

  const WrapComponent = breakout ? Breakout : Section

  return (
    <WrapComponent>
      <Container size="2">
        <ImageWithBackgroundBlur
          base64={data?.base64}
          description={description}
          image={data?.img}
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
