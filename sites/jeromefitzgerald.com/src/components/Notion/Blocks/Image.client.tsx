/**
 * @todo(types) next/image
 */
// import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

// import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NextImage from 'next/image'

// @todo(complexity) 11
// eslint-disable-next-line complexity
function Image({ ...props }) {
  // @note(notion) eject for html validity purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _time_time, base64, expiry_time, img, order, unoptimized, url, ...image } =
    props

  const isPriority = props?.priority ? props?.priority : order < 2 ? true : false

  // @todo(js) can do this be handled with ...
  // @hack(next) in case no comments are found in notion
  if (!image?.alt) image.alt = ''
  if (!image?.sizes)
    // image.sizes = '(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 70vw'
    image.sizes =
      '(max-width: 768px) 90vw, (max-width: 1280px) 50vw, (max-width: 2560px) 75vw, 50vw'
  if (!image.blurDataURL) image.blurDataURL = base64

  const imageProps = {
    fetchPriority: isPriority ? 'high' : 'auto',
    priority: isPriority,
    // loading: isPriority ? 'eager' : 'lazy',
    quality: 90,
    // unoptimized = env.IS_DEV',
    ...image,
    ...img,
  }

  // console.dir(`imageProps`)
  // console.dir(imageProps)

  // const testProps = {
  //   alt: imageProps.alt,
  //   blurDataURL: imageProps.blurDataURL,
  //   fetchPriority: imageProps.fetchPriority,
  //   priority: imageProps.priority,
  //   quality: imageProps.quality,
  //   // sizes: imageProps.sizes,
  //   src: imageProps.src,
  // }

  // // console.dir(`testProps`)
  // // console.dir(testProps)

  return (
    <>
      <NextImage
        className="h-auto w-full rounded-sm"
        placeholder="blur"
        {...imageProps}
      />
      {/* <Box
        height="100%"
        maxWidth={{ initial: '100%', lg: '1024px', md: '768px', xl: '1280px' }}
        position="relative"
      >
        <NextImage
          className="rounded-3"
          fill={true}
          placeholder="blur"
          {...testProps}
        />
      </Box> */}
    </>
  )
}

export { Image as ImageClient }
