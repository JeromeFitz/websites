import type { Show } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
import { Meta } from '~components/Meta'
import { notionConfig } from '~config/index'
import { GENERATE } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
import { getNotionData, preload } from '~utils/getNotionData'

// import { log } from '~utils/log'
import { Listing } from './Listing'
import { UpcomingEvents } from './UpcomingEvents'
// const DEBUG_KEY = '(notion)/shows/[[..catchAll]]/page.tsx >> '

// @todo(types)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ROUTE_TYPE = notionConfig.NOTION.SHOWS.slug

export const dynamicParams = true

function Slug({ data, pathVariables }) {
  const { isIndex, routeType } = pathVariables
  const { content, images, info } = data
  return (
    <>
      {!isIndex && (
        <Suspense fallback={<p>Loading...</p>}>
          <ContentNodes content={content} images={images} />
        </Suspense>
      )}
      <Meta
        data={data}
        key={`${info?.id}--meta-1`}
        isTitleHidden
        routeType={routeType}
      />
      <UpcomingEvents id={info?.id} />
    </>
  )
}

export function generateStaticParams() {
  return GENERATE.shows.map((show) => ({
    catchAll: [...show],
  }))
}

export async function generateMetadata({ ...props }) {
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  const { metadata } = await getNotionData({
    catchAll,
  })
  return metadata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  // log(`${DEBUG_KEY} props`, props)
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)

  preload({ catchAll, options: {} })
  const { data, pathVariables } = await getNotionData({
    catchAll,
  })

  const { isIndex } = pathVariables
  const { info } = data
  const { properties }: { id: string; properties: Show } = info
  const { title } = properties

  const Component = isIndex ? Listing : Slug

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading overline={ROUTE_TYPE} title={isIndex ? 'Viewing All' : title} />
      <Suspense fallback={<p>Loading...</p>}>
        <Component data={data} pathVariables={pathVariables} />
      </Suspense>
    </>
  )
}
