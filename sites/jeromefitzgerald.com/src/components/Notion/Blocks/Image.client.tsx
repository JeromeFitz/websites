import NextImage, { unstable_getImgProps as getImgProps } from 'next/image'
import { preload } from 'react-dom'

function Image({ ...props }) {
  // @note(notion) eject for html validity purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _time_time, base64, expiry_time, img, order, unoptimized, url, ...image } =
    props

  const isPriority = props?.priority ? props?.priority : order < 2 ? true : false
  const hack: any = {}
  hack.priority = isPriority
  hack.fetchPriority = isPriority ? 'high' : 'auto'
  hack.loading = isPriority ? 'eager' : 'lazy'
  hack.quality = 90

  // @hack(next) in case no comments are found in notion
  if (!image?.alt) image.alt = ''

  if (!image?.sizes)
    image.sizes = '(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 70vw'

  /**
   * @hack(next) NEXT-811
   * ref: https://github.com/vercel/next.js/issues/43134
   */
  const imgProps = { ...hack, ...image }
  const preloadImgProps = getImgProps(imgProps)
  isPriority &&
    preload(preloadImgProps.props.src, {
      // @todo(types) Type '"image"' is not assignable to type 'PreloadAs
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as: 'image',
      imageSrcSet: preloadImgProps.props.srcSet,
      imageSizes: imgProps.sizes,
    })

  return (
    <>
      <NextImage
        className="flex w-full justify-center"
        placeholder="blur"
        {...imgProps}
      />
    </>
  )
}

export { Image as NextImage }
