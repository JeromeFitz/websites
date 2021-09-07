import useSWR from 'swr'

import Layout from '~components/Layout'
import Page from '~components/Notion/Page'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
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

  // console.dir(`props`)
  // console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */
  const { data, error } = useSWR(
    () => (!!url ? `/api/notion/${url}` : null),
    // () => (!!slug ? `/api/notion/${slug}` : null),
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
  if (error || !data || data?.content === undefined || data?.info === undefined)
    return (
      <>
        <Layout>
          <h1 key={`error-loading-h1`}>{error ? <>Error</> : <>Loading...</>}</h1>
        </Layout>
      </>
    )

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
  // const homepageSlug = 'homepage-2021'
  // const catchAll = [homepageSlug]
  const clear = false
  const pathVariables = getPathVariables(catchAll)
  const data = await getCatchAll({ preview, clear, catchAll })
  const images = await getImages({ data, pathVariables })

  const dataReturn = { ...data, images }
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
