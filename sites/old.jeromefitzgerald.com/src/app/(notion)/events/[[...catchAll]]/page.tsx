import type { Event } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { getDataCms, getMetadata } from '~app/(notion)/getMetadata'
import { Debug } from '~components/Debug'
import { notionConfig } from '~config/index'
import { GENERATE } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
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

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata({ ...props }) {
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  const data = await getDataCms(catchAll)
  const { metadata } = getMetadata({ catchAll, data })
  return metadata
}

export const preload = ({ ...props }) => {
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  void getDataCms(catchAll)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  // log(`${DEBUG_KEY} props`, props)
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  const data = await getDataCms(catchAll)
  const { content, images, info } = data
  const { pathVariables } = getMetadata({ catchAll, data })
  const { isIndex } = pathVariables
  const { properties }: { properties: Event } = info
  const { title } = properties

  const Component = isIndex ? Listing : Slug

  // log(`${DEBUG_KEY} pathVariables`, pathVariables)

  return (
    <>
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
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
