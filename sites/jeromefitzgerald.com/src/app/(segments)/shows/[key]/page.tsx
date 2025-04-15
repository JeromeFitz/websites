import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import type { Metadata, ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation.js'

import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'
import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getShow, segment } from '@/lib/drizzle/schemas/cache-shows/queries'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'
import { getSegmentsForGenerateStaticParams } from '@/utils/next/getSegmentsForGenerateStaticParams'

import { Show as ShowComponent } from './_components/Show'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

async function _generateStaticParams() {
  return await getSegmentsForGenerateStaticParams(segment)
}
export const generateStaticParams = envClient.IS_DEV
  ? undefined
  : _generateStaticParams

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = getKey(segment, (await params).key)
  const infoInit: Show[] = await getShow({ key })
  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    }
  }
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

async function Slug({ params }: Props) {
  const key = getKey(segment, (await params).key)
  const items: Show[] = await getShow({ key })

  if (isEmpty(items)) {
    return notFound()
  }

  const item = items[0]
  const blocks: Block[] = await getBlocks({ key })

  return <ShowComponent blocks={blocks} item={item} />
}

export default Slug
