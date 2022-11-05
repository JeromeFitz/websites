import {
  darkTheme,
  Caption,
  Container,
  Section,
  Skeleton,
} from '@jeromefitz/design-system'
import _isEmpty from 'lodash/isEmpty'
import { fetcher } from 'next-notion/src/lib/fetcher'
import * as React from 'react'
import useSWR from 'swr'

import type { IGetPlaiceholderReturnCustom } from '../../lib/types'
import { Gradients } from '../../styles/const'

import { Image, ImageBlur, ImageContainer } from './ImageLead.styles'

const ImageWithBackgroundBlur = ({
  base64,
  description,
  image,
  priority = true,
  quality = 90,
  // sizes = '(max-width: 1280) 10vh, 30vh',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  // sizes= '',
  slug,
}) => {
  const { height, src, width } = image

  const props = {
    alt: description,
    blurDataURL: base64,
    height,
    key: slug,
    placeholder: 'blur',
    priority,
    quality,
    sizes,
    src,
    width,
  }
  return (
    <ImageContainer
      css={{
        [` & ${ImageBlur}`]: {
          backgroundImage: Gradients.light.active,
          [`.${darkTheme} &`]: { backgroundImage: Gradients.dark.active },
        },
      }}
    >
      <ImageBlur
        css={{
          transition: 'all 0.1s ease-in-out',
        }}
      />
      <Image {...props} />
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
  /**
   * @refactor(images) passing images from SSR is not ideal
   * @note(notion) this is based off of seoImage only at the moment
   * @note(image) check against the first key in `images` only (seoImage)
   */
  const imageSlug = !!image && Object.keys(image)[0]
  const url = !!imageSlug && image[imageSlug]?.url

  const fallbackData: IGetPlaiceholderReturnCustom =
    !!url && !!images ? images[`image/${imageSlug}`] : {}
  const urlApi = !!url && _isEmpty(fallbackData) ? `/api/v1/img?url=${url}` : null

  const { data } = useSWR<IGetPlaiceholderReturnCustom>(urlApi, fetcher, {
    fallbackData,
  })

  /**
   * @note Verify Image Exists and is Optimized
   */
  const hasImage = !!data && !!data?.base64

  if (!hasImage) {
    return null
  }

  const WrapComponent: React.ElementType = breakout ? Container : Section

  return (
    <>
      <WrapComponent breakout={breakout}>
        <Container size="2">
          <ImageWithBackgroundBlur
            base64={data.base64}
            description={description}
            image={data.img}
            priority={true}
            slug={imageSlug}
          />
          <Caption>{description}</Caption>
        </Container>
      </WrapComponent>
    </>
  )
}

export { ImageLead, ImageSkeleton, ImageWithBackgroundBlur }
