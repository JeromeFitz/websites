import { styled } from '@jeromefitz/design-system'
import NextImage from 'next/image'

// @todo(types) This is likely not portable. A type annotation is necessary.
const ImageContainer: any = styled('div', {
  position: 'relative',
  borderRadius: '$4',
})
// @todo(types) This is likely not portable. A type annotation is necessary.
const ImageBlur: any = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '99.9%',
  height: '99.9%',
  borderRadius: '$4',
  filter: 'blur(0.25rem) saturate(160%)',
  opacity: '0.81',
  transform: 'scale(1.01)',
})
// @todo(types) This is likely not portable. A type annotation is necessary.
const Image: any = styled(NextImage, {
  borderRadius: '$4',
  position: 'relative',
  overflow: 'hidden',
})

export { Image, ImageBlur, ImageContainer }
