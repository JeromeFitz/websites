import useSWR from 'swr'

import Page from '~components/Notion/Page'
import PageHeading, { SkeletonHeading } from '~components/PageHeading'
import { revalidate, ERROR__FALLBACK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import getStaticPathsCatchAll from '~lib/notion/getStaticPathsCatchAll'
import getNextPageStatus from '~utils/next/getNextPageStatus'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ROUTE_TYPES, SLUG__HOMEPAGE } from '~utils/notion/helper'

const CatchAll = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    // images: imagesFallback,
    items: itemsFallback,
    // hasMeta,
    // isPage,
    // isIndex,
    // meta,
    // routeType,
    // slug,
    url,
  } = props

  const { data, error } = useSWR(
    () => (!!url ? `/api/notion/secret/get/${url}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
      },
      revalidateOnFocus: true,
    }
  )

  const { isDataUndefined, isError, isLoading } = getNextPageStatus(data, error)
  if (isError && isDataUndefined)
    return (
      <PageHeading
        description={ERROR__FALLBACK.description}
        title={ERROR__FALLBACK.title}
      />
    )
  if (isLoading) return <SkeletonHeading />

  return (
    <>
      <Page data={data} {...props} />
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const { catchAll } = props.params
  // @hack(notion) no idea what is causing this
  // look at commit hash: b2afe38c5e1f2d095dc085a17eedc181466b3372
  // and the one after
  if (catchAll[0] === 'true') return { props: {} }
  // const catchAll = [SLUG__HOMEPAGE]
  const clear = false
  const pathVariables = getPathVariables(catchAll)
  /**
   * @cache
   */
  const cache = true
  const data = await getCatchAll({ cache, catchAll, clear, pathVariables, preview })

  const dataReturn = { ...data }
  return {
    props: { preview, ...dataReturn, ...pathVariables, ...props },
    revalidate,
  }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
