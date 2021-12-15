import NextImage from 'next/image'

import { Box } from '@jeromefitz/design-system/components'
import { styled } from '@jeromefitz/design-system/stitches.config'

import { IMAGE__PLACEHOLDER } from '~lib/constants'

const EmptyContent = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '80%',
  // bc: '$loContrast',
  // bc: 'transparent',
  // br: '$4',
  // py: 10,
  // px: 10,
  // marginTop: -15,
  // boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',
  width: '100%',
  height: '100%',

  '& ::selection': {
    backgroundColor: '$blueA5',
  },
})

export function HeroImage({ alt = '', meta = IMAGE__PLACEHOLDER.meta }) {
  const { base64, img } = meta
  return (
    <EmptyContent>
      <Box css={{ height: '100%', my: '0' }}>
        <NextImage
          alt={alt}
          blurDataURL={base64}
          // layout="intrinsic"
          layout="responsive"
          loading="lazy"
          // key={slug}
          placeholder="blur"
          priority={false}
          quality={100}
          sizes={'(min-width: 1280) 80vh, 60vh'}
          {...img}
        />
      </Box>
    </EmptyContent>
  )
}
