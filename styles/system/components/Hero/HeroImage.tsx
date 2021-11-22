// import NextImage from 'next/image'

import { IMAGE__PLACEHOLDER } from '~lib/constants'
import { Box } from '~styles/system/components'
import { keyframes, styled } from '~styles/system/stitches.config'

const focusInNonNext = keyframes({
  '0%': {
    filter: 'blur(50px)',
    transform: 'scale(0.5)',
  },
  '50%': {
    filter: 'blur(25px)',
    transform: 'scale(0.75)',
  },
  '100%': {
    filter: 'blur(0)',
    transform: 'scale(1)',
  },
})

const EmptyContent = styled('div', {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: '80%',
  // bc: '$loContrast',
  bc: 'transparent',
  br: '$4',
  // py: 10,
  // px: 10,
  // marginTop: -15,
  // boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',

  '& ::selection': {
    backgroundColor: '$blueA5',
  },
})

export function HeroImage({ meta = IMAGE__PLACEHOLDER.meta }) {
  const { base64, img, slug } = meta
  return (
    <EmptyContent>
      <Box css={{ height: '100%', my: '0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={slug}
          className="nonNextNoStaticProps"
          src={img.src}
          style={{
            animation: `${focusInNonNext} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
            maxWidth: '100%',
            height: 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundImage: `url(${base64})`,
          }}
        />
      </Box>
    </EmptyContent>
  )
}
