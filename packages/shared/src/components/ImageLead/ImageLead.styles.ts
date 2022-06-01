import { styled } from '@jeromefitz/design-system'
import NextImage from 'next/image'

const ImageContainer = styled('div', {
  position: 'relative',
  borderRadius: '$4',
})

const ImageBlur = styled('div', {
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

const Image = styled(NextImage, {
  borderRadius: '$4',
  position: 'relative',
  overflow: 'hidden',
})

export { Image, ImageBlur, ImageContainer }
