import cx from 'clsx'
import Slugger from 'github-slugger'
import NextImage from 'next/image'
import useSWR from 'swr'

import { CardWithGlow } from '~components/Card'
import { Breakout } from '~components/Layout'
import ImageCaption from '~components/Notion/ImageCaption'

const ImageLead = ({ description, image }) => {
  const slugger = new Slugger()
  const { data: images } = useSWR('images', null)
  // @todo(external)
  const imageSlug = slugger.slug(image?.url)
  const imageData = !!images && images[imageSlug]

  const hasImage = !!imageData && !!imageData.base64

  if (!hasImage) {
    return null
  }

  return (
    <Breakout>
      <div
        className={cx(
          `min-h-full py-6`,
          // `bg-gradient-to-b`,
          // `from-white via-gray-300 to-white`,
          // `dark:from-black dark:via-gray-700 dark:to-black`,
          ''
        )}
      >
        <div
          className={cx(`flex flex-col w-full max-w-4xl`, `px-2 mx-auto md:px-8`)}
        >
          <div className="w-11/12 md:w-2/3 mx-auto py-4 mt-4">
            <CardWithGlow blurDataURL={imageData.base64} isImage={true}>
              <NextImage
                alt={description}
                blurDataURL={imageData?.base64}
                className={cx('rounded-xl')}
                key={imageSlug}
                placeholder="blur"
                priority={true}
                title={description}
                {...imageData?.img}
              />
            </CardWithGlow>
            <ImageCaption caption={description} />
          </div>
        </div>
      </div>
    </Breakout>
  )
}

export default ImageLead
