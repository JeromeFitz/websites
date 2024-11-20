import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// import { notFound } from 'next/navigation.js'
import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'

const slug = '/kitchen-sink'
const { SEGMENT } = CONFIG.PAGES

const image = {
  alt: 'Jerome is wearing a black suit, with a paper mâché head of Charles Entertainment Cheese Junior. A blue duct-tap cap with a yellow “C” resides between two giant rat (mouse?) ears with a cut-out for his face. He is standing pointing an accusatory finger at two poor seated schlubs about to incur his wrath. Due to his stance and finger pointing you cannot see his face under the paper mâché rat head and just see his right ear and side cheek. There is an empty pizza box on a chair behind him.',
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
  className: 'rounded-3',
  height: 960,
  order: 0,
  quality: 90,
  // sizes: '(max-width: 768px) (max-width: 1280px) 61vw, 75vw',
  src: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  width: 1280,
}

export default async function Page(props) {
  // if (!env.IS_DEV) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  const revalidate = props?.revalidate || false
  const { params } = props
  const { catchAll } = await params
  const segmentInfo = getSegmentInfo({
    params: { catchAll },
    revalidate,
    SEGMENT,
  })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = await draftMode()

  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const { seoDescription, title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  return (
    <Grid>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <Badge size="2">testing</Badge>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        {/* <Blocks data={data?.blocks} /> */}
        <Text size="4">{seoDescription}</Text>
        <NextImage {...image} />
        <Blocks data={data?.blocks} />
      </HeadlineContent>
    </Grid>
  )
}
