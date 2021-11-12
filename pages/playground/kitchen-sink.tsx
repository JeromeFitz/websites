// import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Page from '~components/Notion/Page'
import PageHeading, { SkeletonHeading } from '~components/PageHeading'
import { revalidate, ERROR__FALLBACK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import getNextPageStatus from '~utils/next/getNextPageStatus'

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
    slug,
    // url,
  } = props

  // console.dir(`props`)
  // console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */
  // const [mounted, setMounted] = useState(true)
  // useEffect(() => setMounted(false), [])
  const { data, error } = useSWR(
    () => (!!slug ? `/api/notion/${slug}` : null),
    // () => (!!slug ? `/api/notion/${slug}?cache=${mounted}` : null),
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
      <Page data={data} props={props} />
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  // const { catchAll } = props.params
  const catchAll = ['kitchen-sink']
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

export default CatchAll
