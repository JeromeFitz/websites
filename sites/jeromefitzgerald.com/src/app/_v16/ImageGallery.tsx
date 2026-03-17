import type { Image } from './types'

import { Dialog, Flex, Grid } from '@radix-ui/themes'

// import { image } from './_meta'
import { ImageContainer } from './Image'

const ImageModal = ({ idx, image }: { idx: number; image: any }) => {
  const isEnabled = false

  return isEnabled ? (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="hover:cursor-pointer">
          <ImageContainer image={image} />
        </Dialog.Trigger>

        <Dialog.Content size="1" className="size-full">
          <Flex direction="column" gap="5" height="100%" width="100%">
            <ImageContainer image={image} />
            <Dialog.Title>Image: {idx}</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Description: {idx}
            </Dialog.Description>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  ) : (
    <>
      <ImageContainer image={image} />
    </>
  )
}

const ImageGallery = ({ images }: { images: Image[] }) => {
  // @todo(image) scrollable content, more rows
  const imagesCount = images.length > 4 ? 4 : images.length
  if (imagesCount === undefined) return null
  return (
    <Grid
      columns={{ initial: '1', md: imagesCount.toString() }}
      gapX={{ initial: '1', md: '3' }}
      gapY={{ initial: '6', md: '6' }}
      pb={{ initial: '6', md: '9' }}
      role="list"
      height="100%"
      width="100%"
    >
      {images.map((image, i) => {
        // biome-ignore lint/suspicious/noArrayIndexKey: @todo
        return <ImageModal idx={i} image={image} key={`image-modal-${i}`} />
      })}
    </Grid>
  )
}

export { ImageGallery }
