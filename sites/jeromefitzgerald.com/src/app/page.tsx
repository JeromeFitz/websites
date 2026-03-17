import type { Metadata, ResolvingMetadata } from 'next'

import type { Page } from '@/lib/drizzle/schemas/cache-pages/types'

// import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
// import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
// import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { ArticleMain } from '@/components/Article/Article.Main'
import { HeaderFull } from '@/components/Header/Header.Full'
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

  // const title = `${info.title}`
  const title = 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.'
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

function Subline() {
  return (
    <Text size={{ initial: '2', md: '4' }}>
      <Em>An actor, comedian, and writer residing in NYC.</Em>
      <br />
      <br />
      <Em>Also does tech stuff.</Em>
      <br />
    </Text>
  )
}

function Home() {
  return (
    <Flex direction="column" width="100%">
      <HeaderFull count="he/him" subline={<Subline />} title="Jerome" />
      <ArticleMain>
        <Flex
          direction="column"
          gap="9"
          mb={{ initial: '4', md: '6' }}
          pb={{ initial: '4', md: '6' }}
        >
          <Flex direction="column" gap="3">
            <Text size={{ initial: '3', md: '5' }}></Text>
          </Flex>
        </Flex>
      </ArticleMain>
    </Flex>
  )
}

export default Home
