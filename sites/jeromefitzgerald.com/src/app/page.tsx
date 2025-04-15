import type { Metadata, ResolvingMetadata } from 'next'

import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

// import { getImageKeyValue } from '@/lib/drizzle/schemas/cache-images/queries'
import { getPage, segment } from '@/lib/drizzle/schemas/cache-pages/queries'
// import { getImageKeySlug } from '@/lib/drizzle/utils/getImageKeySlug'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const _key = 'homepage'

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = getKey(segment, _key)
  const infoInit: Page[] = await getPage({ key })

  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    }
  }

  const info = infoInit[0]
  const previousImages = (await parent).openGraph?.images || []

  const title = `${info.title}`
  const description = `${info.seoDescription}`

  const seoImage: any = info.seoImage
  const imageUrl = info.seoImage ? seoImage[seoImage?.type]?.url : null
  // const imageData = getImageKeySlug(imageUrl)
  // const imageKeyValue = await getImageKeyValue({ key: imageData.key })
  // const image: any = imageKeyValue[0].value[0]

  return {
    description,
    openGraph: {
      description,
      images: [imageUrl, ...previousImages],
      title,
    },
    title,
  }
}

function Home() {
  return <></>
}

export default Home
