import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { getDataCms, getMetadata } from '~app/(notion)/getMetadata'
import { Debug } from '~components/Debug'
import { PAGES__HOMEPAGE } from '~config/notion'
import { PageHeading } from '~ui/PageHeading'
// import { log } from '~utils/log'

import { ListingShows } from './ListingShows'
//
// const DEBUG_KEY = 'page.tsx >> '

const ROUTE_TYPE = PAGES__HOMEPAGE

export const revalidate = 0

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const data = await getDataCms(catchAll)
  const { metadata } = getMetadata({ catchAll, data })
  // log(`${DEBUG_KEY} metadata`, metadata)
  return {
    ...metadata,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    title: { default: `${metadata?.title?.default} | Comedian. Human. Nice.` },
  }
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
  const { properties }: { properties: Page } = info
  const { title } = properties

  // log(`${DEBUG_KEY} pathVariables`, pathVariables)
  // log(`${DEBUG_KEY} data`, data)
  // log(`${DEBUG_KEY} title`, title)

  return (
    <>
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
      <PageHeading overline="" title={title} />
      {!!content && <ContentNodes content={content} images={images} />}
      {/* @todo(loading) suspense */}
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <PageHeading overline="shows" title={'Shows'} />
          <ListingShows />
        </>
      </Suspense>
    </>
  )
}
