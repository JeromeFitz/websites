import dynamic from 'next/dynamic'
// import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Page from '~components/Notion/Page'
// import { SLUG__HOMEPAGE } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import getPathVariables from '~lib/notion/getPathVariables'
import getStaticPathsCatchAll from '~lib/notion/getStaticPathsCatchAll'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

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

  // console.dir(`props`)
  // console.dir(props)

  // const [mounted, setMounted] = useState(true)
  // useEffect(() => setMounted(false), [])
  const { data, error } = useSWR(
    () => (!!url ? `/api/notion/${url}` : null),
    // () => (!!url ? `/api/notion/${url}?cache=${mounted}` : null),
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
  // const isLoading = !isError && isDataUndefined

  if (isError && isDataUndefined)
    return (
      <>
        <Layout>
          <Breadcrumb isIndex={true} title={'Loading...'} />
        </Layout>
      </>
    )
  // if (
  //   (error && data === undefined) ||
  //   !data ||
  //   data?.content === undefined ||
  //   data?.info === undefined
  // )
  //   return (
  //     <>
  //       <Layout>
  //         <h1 key={`error-loading-h1`}>{error ? <>Error</> : <>Loading...</>}</h1>
  //       </Layout>
  //     </>
  //   )

  return (
    <>
      <Layout>
        <Page data={data} props={props} />
      </Layout>
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
  const data = await getCatchAll({ cache, catchAll, clear, preview })
  const images = !!data ? await getImages({ data, pathVariables }) : []

  const dataReturn = { ...data, images }
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
