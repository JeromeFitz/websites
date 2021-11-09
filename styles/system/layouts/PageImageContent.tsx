import ContentNodes from '~components/Notion/ContentNodes'
import { ImageLead } from '~components/Notion/Layout'
import PageHeading from '~components/PageHeading'

const PageImageContent = ({ data }) => {
  const { content, images, info } = data
  const { seoDescription, seoImage, seoImageDescription, title } = info?.data
  return (
    <>
      <PageHeading description={seoDescription} title={title} />
      <ImageLead
        description={seoImageDescription}
        image={seoImage}
        imagesFallback={images}
      />
      <ContentNodes content={content} images={images} />
    </>
  )
}

export default PageImageContent
