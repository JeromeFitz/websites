import type { Page } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { getMetadata } from '~app/(notion)/getMetadata'
import { Debug } from '~components/Debug'
import { HOST_API, HOST_APIS } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
import { log } from '~utils/log'

const ROUTE_TYPE = 'colophon'
const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

async function getData(catchAll) {
  const url = `${HOST_APIS.CMS}/${catchAll.join('/')}`
  log(`url`, url)

  const res = await fetch(url)
  if (!res.ok) {
    // @note(next) activates closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateMetadata() {
  const catchAll = [ROUTE_TYPE]
  const data = await getData(catchAll)
  const { metadata } = getMetadata({ catchAll, data })
  return metadata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Page({ preview = false, ...props }) {
  const catchAll = [ROUTE_TYPE]

  log(`${DEBUG_KEY} HOST_API`, HOST_API)
  log(`${DEBUG_KEY} HOST_APIS`, HOST_APIS)

  const data = await getData(catchAll)
  const { content, images } = data
  const { metadata, pathVariables } = getMetadata({ catchAll, data })
  log(`${DEBUG_KEY} metadata`, metadata)
  log(`${DEBUG_KEY} pathVariables`, pathVariables)

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
