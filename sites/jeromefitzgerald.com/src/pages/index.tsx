import { PageHeading, SkeletonHeading } from '@jeromefitz/design-system/components'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { Page } from '~components/Layout'
import { notionConfig } from '~config/websites'
import mockData from '~data/mock/notion/shows'
import {
  nextWeirdRoutingSkipData,
  revalidate,
  ERROR__FALLBACK,
} from '~lib/constants'
import fetcher from '~lib/fetcher'
// import ShowsListing from '~lib/notion/app/routes/Shows/Listing'
import getCatchAll from '~lib/notion/getCatchAll'
import getDataReturn from '~lib/notion/getDataReturn'
import { notion } from '~lib/notion/helper'
import getNextPageStatus from '~utils/getNextPageStatus'

const ShowsListing = dynamic(() => import('~lib/notion/app/routes/Shows/Listing'), {
  ssr: false,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { PAGES__HOMEPAGE } = notionConfig

const Index = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    images: imagesFallback,
    items: itemsFallback,
    // hasMeta,
    // isPage,
    // isIndex,
    // meta,
    // routeType,
    slug,
    url,
  } = props

  // console.dir(`props`)
  // console.dir(props)

  const { data, error } = useSWR(
    () => (!!slug ? `/api/notion/${slug}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
        images: imagesFallback,
      },
      revalidateOnFocus: true,
    }
  )

  const { is404, isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error
  )
  if (isError && isDataUndefined)
    return (
      <PageHeading
        description={ERROR__FALLBACK.description}
        title={ERROR__FALLBACK.title}
      />
    )
  if (isLoading) return <SkeletonHeading />
  if (is404)
    return (
      <PageHeading
        description={`Hrm, sorry about this. This page is not found: ./${url}`}
        title={'404'}
      />
    )

  /**
   * @hack(notion)
   * Since Notion does not have an embed currently,
   *  this page is very hacked. However, due to this
   *  being the index/homepage this is acceptable
   *  (well to me I guess heh)
   *
   * @todo(notion)
   * - Production:  Pull from `./cache/shows.json`
   * - Development: Pull from `mockData`
   */
  const { images, items } = mockData
  const dataShows = {
    items,
  }
  const routeTypeShows = 'shows'

  /**
   * @todo(config) dynamic site selection
   *
   * With the move to `turborepo` this is probably not needed
   * as each `website` will have its own homepage
   */
  const hasShows = process.env.NEXT_PUBLIC__SITE === 'jeromefitzgerald.com'

  return (
    <>
      <Page data={data} {...props} />
      {hasShows && (
        <ShowsListing data={dataShows} images={images} routeType={routeTypeShows} />
      )}
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  // const { catchAll } = props.params
  const catchAll = [PAGES__HOMEPAGE]
  // @hack(notion) no idea what is causing this
  // look at commit hash: b2afe38c5e1f2d095dc085a17eedc181466b3372
  // and the one after
  if (nextWeirdRoutingSkipData.includes(catchAll[0])) return { props: {} }
  const clear = false
  const pathVariables = notion.custom.getPathVariables({ catchAll })

  /**
   * @cache
   */
  const cache = true
  const data = await getDataReturn({
    data: await getCatchAll({
      cache,
      catchAll,
      clear,
      pathVariables,
      preview,
    }),
    pathVariables,
  })
  return {
    props: { preview, ...data, ...pathVariables, ...props },
    revalidate,
  }
}

export default Index
