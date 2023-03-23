import type { Podcast } from '@jeromefitz/notion/schema'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Debug } from '~components/Debug'
import { notionConfig } from '~config/index'
// import { GENERATE } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
import { getNotionData, preload } from '~utils/getNotionData'
// import { log } from '~utils/log'

// const DEBUG_KEY = '(notion)/podcasts/[[..catchAll]]/page.tsx >> '

// @todo(types)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { slug: ROUTE_TYPE } = notionConfig.NOTION.PODCASTS

// export const dynamicParams = true

// export function generateStaticParams() {
//   // return [{ catchAll: ['alex-o-jerome'] }, { catchAll: ['jerome-and'] }]
//   return GENERATE.podcasts.map((item) => ({
//     catchAll: [...item],
//   }))
// }

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

  preload({ catchAll })
  const { data, pathVariables } = await getNotionData({
    catchAll,
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dataType, isIndex, routeType, slug } = pathVariables
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, images, info, items } = data
  const { properties }: { properties: Podcast } = info
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { seoDescription, title } = properties

  // log(`${DEBUG_KEY} pathVariables`, pathVariables)
  // log(`${DEBUG_KEY} data`, data)
  // log(`${DEBUG_KEY} title`, title)

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading
        overline={ROUTE_TYPE}
        title={isIndex ? 'Upcoming Podcasts' : title}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {/* <Component data={data} pathVariables={pathVariables} /> */}
      <Suspense fallback={<p>Loading...</p>}>
        <ContentNodes content={content} images={images} />
      </Suspense>
    </>
  )
}
