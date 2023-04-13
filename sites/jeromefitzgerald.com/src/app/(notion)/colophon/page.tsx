import type { Page } from '@jeromefitz/notion/schema'
// import _isEqual from 'lodash/isEqual'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

// import { Debug } from '~components/Debug'
import { HOST_API, HOST_APIS } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
// import { cx } from '~utils/cx'
import { getNotionData } from '~utils/getNotionData'
import { log } from '~utils/log'

const ROUTE_TYPE = 'colophon'
const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

async function getData(catchAll) {
  const url = `${HOST_APIS.CMS}/${catchAll.join('/')}`
  log(`url`, url)
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

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
  // const { data, pathVariables } = await getNotionData({
  //   catchAll,
  // })
  // const { content, images } = data

  log(`${DEBUG_KEY} HOST_API`, HOST_API)
  log(`${DEBUG_KEY} HOST_APIS`, HOST_APIS)

  const _data = await getData(catchAll)
  // log(`${DEBUG_KEY} data`, data)
  // log(`${DEBUG_KEY} _data`, _data)
  // const isEqual = _isEqual(data, _data)
  // log(`${DEBUG_KEY} isEqual`, isEqual ? 'y' : 'n')
  const data = _data
  const { content, images } = data

  return (
    <>
      {/* <Debug data={data} pathVariables={pathVariables} /> */}
      <PageHeading overline={`colophon`} title={'Colophon'} />
      <Suspense fallback={<p>Loading...</p>}>
        {!!content && <ContentNodes content={content} images={images} />}
      </Suspense>
    </>
  )
}
