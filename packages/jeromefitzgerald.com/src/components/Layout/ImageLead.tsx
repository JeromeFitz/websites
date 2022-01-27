import {
  Breakout,
  Caption,
  Container,
  Section,
  Skeleton,
} from '@jeromefitz/design-system/components'
// import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import _isEmpty from 'lodash/isEmpty'
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
 */

// const AspectRatio = AspectRatioPrimitive

const ImageWithBackgroundBlur = ({
  base64,
  description,
  image,
  priority = false,
  // sizes = '(max-width: 1280) 10vh, 30vh',
  // // sizes = '256px',
  slug,
}) => {
  // console.dir(`image`)
  // console.dir(image)
  const { src } = image
  // console.dir(`src:     ${src}`)
  // console.dir(`width:   ${image.width}`)
  // console.dir(`height:  ${image.height}`)

  const width = image.width
  const height = image.height

  // console.dir(`width:   ${width}`)
  // console.dir(`height:  ${height}`)

  // const width = 256
  // const height = 256

  // const width = 665
  // const height = 665

  return (
    <ImageContainer
      // className="w-2/3 mx-auto"
      css={
        {
          // height: '250px',
          // maxHeight: '375px',
          // height: '100%',
          // ml: 'auto',
          // mr: 'auto',
          // overflow: 'hidden',
          // width: '75%',
          // maxWidth: '100%',
          // height: 'auto',
          // '@bp1': { height: '375px' },
          // '@bp2': { height: '375px' },
        }
      }
    >
      {/* <AspectRatio.Root ratio={4 / 3}> */}
      <ImageBlur
        css={{
          backgroundImage: `url(${base64})`,
          backgroundSize: 'cover',
          borderRadius: '$4',
        }}
      />
      {/* <AspectRatio.Root ratio={16 / 9}> */}
      <Image
        alt={description}
        blurDataURL={base64}
        // layout="fill"
        // layout="responsive"
        // sizes="256px"
        // layout="fixed"
        layout="intrinsic"
        // sizes={sizes}
        key={slug}
        placeholder="blur"
        priority={priority}
        quality={100}
        src={src}
        height={height}
        width={width}
        // {...image}
      />
      {/* </AspectRatio.Root> */}
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

  // @todo(types)
  const WrapComponent: any = breakout ? Breakout : Section

  return (
    <>
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
    </>
  )
}

export { ImageSkeleton, ImageWithBackgroundBlur }
export default ImageLead
