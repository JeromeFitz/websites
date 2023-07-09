import NextImage from 'next/image'

function Image({ ...props }) {
  // @note(notion) eject for html validity purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _time_time, base64, expiry_time, img, order, unoptimized, url, ...image } =
    props

  const isPriority = props?.priority ? props?.priority : order < 2 ? true : false
  const hack: any = {}
  hack.priority = isPriority
  hack.fetchPriority = isPriority ? 'high' : 'auto'
  // hack.loading = isPriority ? 'eager' : 'lazy'
  hack.quality = 90
  // const preload = `/_next/image?url=${encodeURIComponent(props?.src)}&w=1920&q=${
  //   hack.quality
  // }`

  // @hack(next) in case no comments are found in notion
  if (!image?.alt) image.alt = ''
  if (!image?.sizes)
    image.sizes = '(max-width: 768px) 50vw, (max-width: 1200px) 75vw, 100vw'
  // image.unoptimized = process.env.NODE_ENV !== 'production'
  // console.dir(`> Image.client: debug`)
  // console.dir(hack)
  // console.dir(image)

  return (
    <>
      {/* @hack(next) NEXT-811 */}
      {/* https://github.com/vercel/next.js/issues/43134 */}
      {/* {!!hack.priority && <link rel="preload" href={preload} as="image" />} */}
      {/* @todo(types) */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <NextImage
        className="flex w-full justify-center"
        placeholder="blur"
        {...hack}
        {...image}
      />
    </>
  )
}

export { Image as NextImage }
