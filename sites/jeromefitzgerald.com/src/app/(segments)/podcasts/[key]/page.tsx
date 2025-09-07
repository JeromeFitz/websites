import type { Metadata, ResolvingMetadata } from 'next'

import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'
import type { Podcast } from '@/lib/drizzle/schemas/cache-podcasts/types'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import { notFound } from 'next/navigation.js'

import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getPodcast, segment } from '@/lib/drizzle/schemas/cache-podcasts/queries'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'
import { getSegmentsForGenerateStaticParams } from '@/utils/next/getSegmentsForGenerateStaticParams'

import { PodcastComponent } from './_components/Podcast'

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
  const key = (await params).key
  const items: Podcast[] = await getPodcast({ key: getKey(segment, key) })

  if (isEmpty(items)) {
    return {
      title: `404: ${segment}`,
    }
  }

  const item = items[0]
  const previousImages = (await parent).openGraph?.images || []

  const title = `${item.title}`
  const description = `${item.seoDescription}`

  const seoImage: any = item.seoImage
  const imageUrl = item.seoImage ? seoImage[seoImage?.type]?.url : null
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
  const key = (await params).key
  const items: Podcast[] = await getPodcast({ key: getKey(segment, key) })

  if (isEmpty(items)) {
    return notFound()
  }

  const item = items[0]
  const blocks: Block[] = await getBlocks({ key })

  return <PodcastComponent blocks={blocks} item={item} />
}

export default Slug
