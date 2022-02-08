import {
  Caption,
  Container,
  Section,
  Skeleton,
} from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import _isEmpty from 'lodash/isEmpty'
// import * as React from 'react'
// import { useIsomorphicLayoutEffect } from 'react-use'
import useSWR from 'swr'

import fetcher from '~lib/fetcher'

import { Image, ImageBlur, ImageContainer } from './ImageLead.styles'

/**
 * @optimization
 *
 * Just because we know the WIDTH/HEIGHT of images, does not mean
 *  we shoudl be passing them to `Image` (next/image`)
 *
 *
 * Also big __update__ needed as we are no longer using `sizes`
 * Please adjust when you can
 *
 *
 */
const ImageWithBackgroundBlur = ({
  base64,
  description,
  image,
  priority = false,
  // sizes = '(max-width: 1280) 10vh, 30vh',
  // // sizes = '256px',
  slug,
}) => {
  const { height, src, width } = image

  // const [backgroundImageLoaded, backgroundImageLoadedSet] = React.useState(false)
  // useIsomorphicLayoutEffect(() => {
  //   backgroundImageLoadedSet(true)
  //   return () => {
  //     backgroundImageLoadedSet(false)
  //   }
  // })

  // console.dir(`src:     ${src}`)
  // console.dir(`priority: ${priority}`)

  return (
    <ImageContainer>
      <ImageBlur
        css={{
          // backgroundImage: `url(${base64})`,
          // backgroundImage: backgroundImageLoaded
          //   ? `url(${base64}),linear-gradient(45deg,$colors$blackA7,$colors$blackA12)`
          //   : `linear-gradient(45deg,$colors$blackA7,$colors$blackA12)`,
          backgroundImage: `linear-gradient(45deg,$colors$blackA7,$colors$blackA12)`,
          backgroundSize: 'cover',
          borderRadius: '$4',
          [`.${darkTheme} &`]: {
            // backgroundImage: `url(${base64})`,
            // backgroundImage: backgroundImageLoaded
            // ? `url(${base64}),linear-gradient(45deg,$colors$whiteA7,$colors$whiteA12)`
            // : `linear-gradient(45deg,$colors$whiteA7,$colors$whiteA12)`,
            backgroundImage: `linear-gradient(45deg,$colors$whiteA7,$colors$whiteA12)`,
          },
        }}
      />

      <Image
        alt={description}
        blurDataURL={base64}
        layout="intrinsic"
        key={slug}
        placeholder="blur"
        priority={priority}
        quality={80}
        src={src}
        height={height}
        width={width}
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
  /**
   * @refactor(images) passing images from SSR is not ideal
   * @note(notion) this is based off of seoImage only at the moment
   * @note(image) check against the first key in `images` only (seoImage)
   */
  const imageSlug = !!image && Object.keys(image)[0]
  const url = !!imageSlug && image[imageSlug]?.url
  const fallbackData = !!url && !!images ? images[imageSlug] : {}
  // @note(image) do not call if we do not need to
  const urlApi = !!url && _isEmpty(fallbackData) ? `/api/v1/img?url=${url}` : null

  const { data } = useSWR<any>(urlApi, fetcher, {
    fallbackData,
  })

  // @note(image) verify it has been optimized
  // @todo(image) fallback base64
  const hasImage = !!data && !!data?.base64

  if (!hasImage) {
    return null
  }

  // @todo(types)
  const WrapComponent: any = breakout ? Container : Section

  return (
    <>
      <WrapComponent breakout={breakout}>
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
    </>
  )
}

export { ImageSkeleton, ImageWithBackgroundBlur }
export default ImageLead
