import { PageHeading, SkeletonHeading } from '@jeromefitz/design-system/components'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { Page } from '~components/Layout'
import { notionConfig } from '~config/index'
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

const IndexShowListing = dynamic(() => import('~custom/IndexShowListing'), {
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
       * @note(swr) turning off for now until we finalize redis settings
       */
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
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

  return (
    <>
      <Page data={data} {...props} />
      <IndexShowListing />
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
