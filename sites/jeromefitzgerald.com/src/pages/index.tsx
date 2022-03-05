import { PageHeading, SkeletonHeading } from '@jeromefitz/design-system/components'
import { ERROR__FALLBACK } from '@jeromefitz/shared/src/lib/constants'
import { nextWeirdRoutingSkipData } from 'next-notion/src/constants'
import { getCatchAll } from 'next-notion/src/getCatchAll'
import { getDataReturn } from 'next-notion/src/getDataReturn'
import { getNotion } from 'next-notion/src/helper'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { getNextPageStatus } from 'next-notion/src/utils'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { Page } from '~components/Layout'
import { notionConfig } from '~config/index'
// import ShowsListing from '~routes/Shows/Listing'

const IndexShowListing = dynamic(() => import('~custom/IndexShowListing'), {
  ssr: false,
})

const notion = getNotion(notionConfig)

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
    () => (!!slug ? `/api/v1/cms/${slug}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
        images: imagesFallback,
      },
      /**
       * @note(swr): Turned off for the moment for on-demand ISR
       */
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const { is404, isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error,
    url
  )
  if (isLoading) return <SkeletonHeading />
  if (is404)
    return (
      <PageHeading
        description={`Hrm, this page does not seem to want to be found`}
        title={'404'}
      />
    )
  if (isError && isDataUndefined)
    return (
      <PageHeading
        description={ERROR__FALLBACK.description}
        title={ERROR__FALLBACK.title}
      />
    )

  return (
    <>
      <Page data={data} {...props} />
      <IndexShowListing />
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const catchAll = [PAGES__HOMEPAGE]
  // const { catchAll } = props.params
  if (nextWeirdRoutingSkipData.includes(catchAll[0])) return { props: {} }

  const clear = false
  const pathVariables = notion.custom.getPathVariables({ catchAll })

  const data = await getDataReturn({
    data: await getCatchAll({
      catchAll,
      clear,
      notionConfig,
      pathVariables,
      preview,
    }),
    pathVariables,
  })
  return {
    props: { preview, ...data, ...pathVariables, ...props },
    /**
     * @note(next)
     * On-Demand ISR, do not pass revalidate
     *
     * ref: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta
     */
  }
}

export default Index
