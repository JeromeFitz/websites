import type { Event } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
import { notionConfig } from '~config/index'
import { GENERATE } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
import { getNotionData, preload } from '~utils/getNotionData'
// import { log } from '~utils/log'

import { EventsPast } from './EventsPast'
import { Listing } from './Listing'
import { Slug } from './Slug'

// const DEBUG_KEY = '(notion)/events/[[..catchAll]]/page.tsx >> '

// @todo(types)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { slug: ROUTE_TYPE } = notionConfig.NOTION.EVENTS

// export const dynamicParams = true

export function generateStaticParams() {
  return GENERATE.events.map((event) => ({
    catchAll: [...event],
  }))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ searchParams, ...props }) {
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  const { metadata } = await getNotionData({
    catchAll,
  })
  return metadata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, searchParams, ...props }) {
  // log(`${DEBUG_KEY} !!searchParams`, !!searchParams)
  // log(`${DEBUG_KEY} searchParams`, searchParams)
  // log(`${DEBUG_KEY} props`, props)
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)

  preload({ catchAll, options: searchParams })
  const { data, pathVariables } = await getNotionData({
    catchAll,
    options: searchParams,
  })
  const { isIndex } = pathVariables
  const { content, images, info } = data
  const { properties }: { properties: Event } = info
  const { title } = properties

  const Component = isIndex ? Listing : Slug

  // log(`properties`, properties)

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading
        overline={ROUTE_TYPE}
        title={isIndex ? 'Upcoming Events' : title}
      />
      <Component data={data} pathVariables={pathVariables} />
      {!isIndex && (
        <Suspense fallback={<p>Loading...</p>}>
          <ContentNodes content={content} images={images} />
        </Suspense>
      )}
      {isIndex && <EventsPast />}
    </>
  )
}
