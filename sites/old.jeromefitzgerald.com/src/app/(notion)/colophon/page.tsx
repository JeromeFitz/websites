import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { getDataCms, getMetadata } from '~app/(notion)/getMetadata'
import { Debug } from '~components/Debug'
import { PageHeading } from '~ui/PageHeading'
// import { log } from '~utils/log'

const ROUTE_TYPE = 'colophon'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const data = await getDataCms(catchAll)
  const { metadata } = getMetadata({ catchAll, data })
  return metadata
}

export const preload = () => {
  const catchAll = [ROUTE_TYPE]
  void getDataCms(catchAll)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  const catchAll = [ROUTE_TYPE]
  const data = await getDataCms(catchAll)
  const { content, images } = data
  const { pathVariables } = getMetadata({ catchAll, data })

  return (
    <>
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
      <PageHeading overline={`colophon`} title={'Colophon'} />
      {/* @todo(next) Actual Loading Screen */}
      <Suspense fallback={<p>Loading...</p>}>
        {!!content && <ContentNodes content={content} images={images} />}
      </Suspense>
    </>
  )
}
