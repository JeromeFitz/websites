import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
import { PageHeading } from '~ui/PageHeading'
import { getNotionData, preload } from '~utils/getNotionData'
// import { log } from '~utils/log'
//
// const DEBUG_KEY = 'page.tsx >> '

const ROUTE_TYPE = 'homepage'

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const { metadata } = await getNotionData({
    catchAll,
  })
  // log(`${DEBUG_KEY} metadata`, metadata)
  return {
    ...metadata,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    title: { default: `${metadata?.title?.default} | Comedian. Human. Nice.` },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  // log(`${DEBUG_KEY} props`, props)
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)

  preload({ catchAll })
  const { data, pathVariables } = await getNotionData({
    catchAll,
  })

  const { content, images, info } = data
  const { properties }: { properties: Page } = info
  const { title } = properties

  // log(`${DEBUG_KEY} pathVariables`, pathVariables)
  // log(`${DEBUG_KEY} data`, data)
  // log(`${DEBUG_KEY} title`, title)

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading overline="" title={title} />
      <Suspense fallback={<p>Loading...</p>}>
        {!!content && <ContentNodes content={content} images={images} />}
      </Suspense>
    </>
  )
}
