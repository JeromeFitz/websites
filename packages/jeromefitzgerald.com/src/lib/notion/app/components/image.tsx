import { Box, Caption } from '@jeromefitz/design-system/components'
import { keyframes } from '@jeromefitz/design-system/stitches.config'
import Slugger from 'github-slugger'
import _size from 'lodash/size'
import NextImage from 'next/image'

import { IMAGE__PLACEHOLDER } from '~lib/constants'

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

const image = ({ images, item }) => {
  const contentHack = item.image
  const imageSrc =
    contentHack?.type === 'external'
      ? contentHack?.external.url
      : contentHack?.file.url
  const slugger = new Slugger()
  const imageSlug = slugger.slug(imageSrc)
  const imageData = !!imageSlug && !!images && images[imageSlug]
  const caption =
    (_size(contentHack?.caption) > 0 && contentHack?.caption[0]?.plain_text) || ''
  // console.dir(`getContentType`)
  // console.dir(`imageSlug: ${imageSlug}`)
  // console.dir(images)
  // console.dir(`imageData`)
  // console.dir(imageData)

  return !!imageData ? (
    <Box
      className="w-2/3 mx-auto"
      css={{
        height: '100%',
        ml: 'auto',
        mr: 'auto',
        overflow: 'hidden',
        width: '66.6667%',
        // maxWidth: '100%',
        // height: 'auto',
      }}
    >
      <NextImage
        alt={caption}
        blurDataURL={imageData.base64}
        key={imageSlug}
        placeholder="blur"
        {...imageData.img}
      />
      {!!caption && <Caption>{caption}</Caption>}
    </Box>
  ) : (
    <Box
      className="w-2/3 h-full mx-auto overflow-hidden"
      css={{
        height: '100%',
        ml: 'auto',
        mr: 'auto',
        overflow: 'hidden',
        width: '66.6667%',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={caption}
        className="nonNextNoStaticProps"
        src={contentHack?.external?.url}
        style={{
          animation: `${focusInNonNext} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
          maxWidth: '100%',
          height: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
        }}
      />
      {!!caption && <Caption>{caption}</Caption>}
    </Box>
  )
}

export default image
