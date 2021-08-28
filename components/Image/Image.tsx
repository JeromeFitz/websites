// import { InferGetStaticPropsType } from 'next'
// import { getPlaiceholder } from 'plaiceholder'
// import { extractImgSrc } from '@plaiceholder/tailwindcss/utils'
import NextImage from 'next/image'

import { ImageProps } from './Image.types'

const base64 =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAeEAABBAIDAQAAAAAAAAAAAAABAAIDBQQhBjEyQf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECIQMTQf/aAAwDAQACEQMRAD8AhOXVcXLbKG5t5ZnZuRjxl5a4Eda9AnrWz8REQp0T5pPY76f/2Q=='

const Image = ({ alt, blurDataUrl, height, src, title, width }: ImageProps) => {
  const blurData = !!blurDataUrl ? blurDataUrl : base64
  return (
    <NextImage
      alt={alt}
      blurDataURL={blurData}
      height={height}
      placeholder="blur"
      src={src}
      title={title}
      width={width}
    />
  )
}

export default Image
