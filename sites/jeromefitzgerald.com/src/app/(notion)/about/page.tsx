import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
import { PageHeading } from '~ui/PageHeading'
// import { cx } from '~utils/cx'
import { getNotionData } from '~utils/getNotionData'
// import { log } from '~utils/log'

const ROUTE_TYPE = 'about'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const { metadata } = await getNotionData({
    catchAll,
  })
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
      {/* @note(next) Debug does not cause: deopted into client-side rendering */}
      {/* @todo(next) Debug could be Suspensed */}
      <Suspense>
        <Debug data={data} pathVariables={pathVariables} />
      </Suspense>
      <PageHeading overline={`about`} title={'Jerome'} />
      <Suspense fallback={<p>Loading...</p>}>
        {!!content && <ContentNodes content={content} images={images} />}
      </Suspense>
    </>
  )
}
