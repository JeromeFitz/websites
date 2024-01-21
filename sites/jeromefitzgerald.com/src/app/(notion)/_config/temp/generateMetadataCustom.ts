/**
 * @hack(next) quick hack to fix SEO/OG
 *
 * This needs to be moved elsewhere
 *
 */
import _title from 'title'

async function generateMetadataCustom({ data, pageData, segmentInfo }) {
  const hasImage = !!pageData?.seoImage
  let images: any = undefined
  if (hasImage) {
    const { getImage } = await import('@jeromefitz/shared/plaiceholder')
    const imageData = await getImage(pageData.seoImage[pageData.seoImage.type].url)
    // console.dir(`imageData:`)
    // console.dir(imageData)
    images = [
      {
        alt: pageData?.seoImageDescription,
        url: imageData?.img?.src,
        width: imageData?.img?.width,
        height: imageData?.img?.height,
      },
    ]
  }

  let titleSeo = ''
  const isEvent = segmentInfo.segment === 'events' && !segmentInfo.isIndex
  if (isEvent) {
    const { dayOfWeekAbbr, dayOfMonth, month, title, time } = pageData

    if (!dayOfWeekAbbr) return null
    titleSeo = `${dayOfWeekAbbr.toUpperCase()} ${month}/${dayOfMonth} ${time}: ${title}`
  } else {
    titleSeo = pageData.title
  }

  const titleSuffix =
    segmentInfo.segment === 'pages' || segmentInfo.isIndex
      ? segmentInfo.slug === '/homepage'
        ? ` | Actor. Comedian. Writer.`
        : ` | Jerome Fitzgerald (he/him)`
      : ` | ${_title(segmentInfo.segment)}`

  titleSeo = `${titleSeo?.toString()}${titleSuffix}`

  const seo = {
    ...data?.seo,
    keywords: pageData?.seoKeywords,
    metadataBase: new URL(`https://${process.env.NEXT_PUBLIC__SITE}`),
    openGraph: {
      images,
      description: pageData?.seoDescription,
      title: titleSeo,
      type: 'website',
    },
    title: titleSeo,
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      site: '@JeromeFitz',
      creator: '@JeromeFitz',
    },
  }

  return seo
}

export { generateMetadataCustom }
