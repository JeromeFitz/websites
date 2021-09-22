import Slugger from 'github-slugger'
import Image from 'next/image'
import useSWR from 'swr'

import ImageCaption from '~components/Notion/ImageCaption'

const ImageLead = ({ description, image }) => {
  const slugger = new Slugger()
  const { data: images } = useSWR('images')
  // @todo(external)
  const imageSlug = slugger.slug(image?.url)
  const imageData = !!images && images[imageSlug]

  const hasImage = !!imageData && !!imageData.base64

  if (!hasImage) {
    return null
  }

  return (
    <div className="w-2/3 mx-auto py-4 mt-4">
      <Image
        alt={description}
        blurDataURL={imageData?.base64}
        key={imageSlug}
        placeholder="blur"
        title={description}
        {...imageData?.img}
      />
      <ImageCaption caption={description} />
    </div>
  )
}

export default ImageLead
