/**
 * @todo(types) next/image
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NextImage from 'next/image'

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
    image.sizes = '(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 70vw'
  if (!image.blurDataURL) image.blurDataURL = base64

  const imageProps = {
    priority: isPriority,
    fetchPriority: isPriority ? 'high' : 'auto',
    // loading: isPriority ? 'eager' : 'lazy',
    quality: 90,
    // unoptimized = process.env.NODE_ENV !== 'production',
    ...image,
    ...img,
  }

  // console.dir(`imageProps`)
  // console.dir(imageProps)

  return (
    <NextImage
      className="flex w-full justify-center"
      placeholder="blur"
      {...imageProps}
    />
  )
}

export { Image as ImageClient }
