import type { Metadata, ResolvingMetadata } from 'next'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { notFound } from 'next/navigation.js'

import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'
import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getPage, segment } from '@/lib/drizzle/schemas/cache-pages/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

const _key = 'colophon'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = getKey(segment, _key)
  const items: Page[] = await getPage({ key })

  if (isEmpty(items)) {
    return {
      title: `404: ${segment}`,
    }
  }

  const item = items[0]
  const previousImages = (await parent).openGraph?.images || []

  const title = `${item.title}`
  const description = `${item.seoDescription}`

  // const seoImage: any = item.seoImage
  // const imageUrl = info.seoImage ? seoImage[seoImage?.type]?.url : null
  // const imageData = getImageKeySlug(imageUrl)
  // const imageKeyValue = await getImageKeyValue({ key: imageData.key })
  // const image: any = imageKeyValue[0].value[0]

  return {
    description,
    openGraph: {
      description,
      images: [...previousImages],
      title,
    },
    title,
  }
}

async function Slug() {
  const key = getKey(segment, _key)
  const items: Page[] = await getPage({ key })
  if (isEmpty(items)) {
    return notFound()
  }
  const item = items[0]
  const blocks: Block[] = await getBlocks({ key })
  const itemBlocks = blocks[0]

  return (
    <Flex
      align="start"
      asChild
      direction="column"
      gap="1"
      justify="between"
      key={item.id}
      my="4"
      py="2"
      width="100%"
    >
      <section>
        <Heading as="h2" highContrast size="5">
          “{item.title}”
        </Heading>
        <Heading as="h3" highContrast size="4">
          {item.slugPreview}
        </Heading>
        <hr className="my-2 w-full" />
        <Notion data={itemBlocks} />
        <hr className="my-2 w-full" />
      </section>
    </Flex>
  )
}

export default Slug
