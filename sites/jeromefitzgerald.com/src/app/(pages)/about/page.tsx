import type { Metadata, ResolvingMetadata } from 'next'

// import type { Block } from '@/lib/drizzle/schemas/cache-blocks/types'
import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
// import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { notFound } from 'next/navigation.js'

import { HeaderFull } from '@/components/Header/Header.Full'
// import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getPage, segment } from '@/lib/drizzle/schemas/cache-pages/queries'
// import { Notion } from '@/lib/notion/Notion.Component'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

import { Section } from './_components/Section'

const _key = 'about'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ key: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(
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

  // const seoImage: any = info.seoImage
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
  // const item = items[0]
  // const blocks: Block[] = await getBlocks({ key })
  // const itemBlocks = blocks[0]

  return (
    <>
      <Flex direction="column">
        <HeaderFull count={5} overline="" title="About" />
        <Flex
          direction="column"
          gap="9"
          mb={{ initial: '4', md: '6' }}
          pb={{ initial: '4', md: '6' }}
        >
          <Flex direction="column" gap="3">
            <Text size={{ initial: '3', md: '5' }}>
              This, admittedly, is not a lot to go on.{' '}
              <Em>
                Perhaps this will have more information at some point, haha.
              </Em>{' '}
            </Text>
          </Flex>
        </Flex>
        <Section />
      </Flex>{' '}
    </>
  )
}

export default Slug
