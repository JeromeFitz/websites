import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
// import { Header } from '~components/Header'
// import { Carousel, Carousel2 } from '~playground/Carousel'
import { PageHeading } from '~ui/PageHeading'
// import { cx } from '~utils/cx'
import { getNotionData } from '~utils/getNotionData'
// import { log } from '~utils/log'

const ROUTE_TYPE = 'kitchen-sink'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const { metadata } = await getNotionData({
    catchAll,
  })
  // log(`${DEBUG_KEY} metadata`, metadata)
  return metadata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  const catchAll = [ROUTE_TYPE]
  const { data, pathVariables } = await getNotionData({
    catchAll,
  })
  const { content, images } = data

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading overline={`testing`} title={'Playground'} />
      <Suspense fallback={<p>Loading...</p>}>
        {!!content && <ContentNodes content={content} images={images} />}
      </Suspense>
    </>
  )
}
