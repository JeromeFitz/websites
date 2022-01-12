import useSWR from 'swr'

import getCatchAll from '@jeromefitz/notion/getCatchAll'
import getPathVariables from '@jeromefitz/notion/getPathVariables'
import getStaticPathsCatchAll from '@jeromefitz/notion/getStaticPathsCatchAll'

import { Page, PageHeading, SkeletonHeading } from '~components/Layout'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PAGES__HOMEPAGE } from '~config/websites'
import {
  nextWeirdRoutingSkipData,
  revalidate,
  ERROR__FALLBACK,
} from '~lib/constants'
import fetcher from '~lib/fetcher'
import getNextPageStatus from '~utils/getNextPageStatus'

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
    () => (!!url ? `/api/notion/${url}` : null),
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
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const { catchAll } = props.params
  // @hack(notion) no idea what is causing this
  // look at commit hash: b2afe38c5e1f2d095dc085a17eedc181466b3372
  // and the one after
  if (nextWeirdRoutingSkipData.includes(catchAll[0])) return { props: {} }
  // const catchAll = [PAGES__HOMEPAGE]
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
