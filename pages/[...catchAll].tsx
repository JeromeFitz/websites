import useSWR from 'swr'

import Page from '~components/Notion/Page'
import PageHeading, { SkeletonHeading } from '~components/PageHeading'
// import { SLUG__HOMEPAGE } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import getStaticPathsCatchAll from '~lib/notion/getStaticPathsCatchAll'

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

  /**
   * @error or @loading
   */
  const isError = error !== undefined
  const isDataUndefined =
    data === undefined || data?.content === undefined || data?.info === undefined
  const isLoading = !isError && isDataUndefined

  if (isError && isDataUndefined)
    return <PageHeading description={`Whoops`} title={`Well, that is not good.`} />
  if (isLoading) return <SkeletonHeading />

  return (
    <>
      <Page data={data} props={props} />
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
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
