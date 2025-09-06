import type { Metadata, ResolvingMetadata } from 'next'

import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'
import type { Episode } from '@/lib/drizzle/schemas/cache-episodes/types'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import { notFound } from 'next/navigation.js'

import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getEpisode, segment } from '@/lib/drizzle/schemas/cache-episodes/queries'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'
import { getSegmentsForGenerateStaticParams } from '@/utils/next/getSegmentsForGenerateStaticParams'

import { EpisodeComponent } from './_components/Episode'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string; 'key-episode': string }>
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
  const keyEpisode = (await params)['key-episode']
  const items: Episode[] = await getEpisode({
    key: getKey('podcasts', `${key}/${keyEpisode}`),
  })

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
  const keyEpisode = (await params)['key-episode']
  const items: Episode[] = await getEpisode({
    key: getKey('podcasts', `${key}/${keyEpisode}`),
  })

  if (isEmpty(items)) {
    return notFound()
  }

  const item = items[0]
  const blocks: Block[] = await getBlocks({ key })

  return <EpisodeComponent blocks={blocks} item={item} />
}

export default Slug
