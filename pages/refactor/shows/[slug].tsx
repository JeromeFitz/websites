// import _map from 'lodash/map'
import { GetStaticPaths, GetStaticProps } from 'next'
import useSWR from 'swr'

import PageHeading, { SkeletonHeading } from '~components/PageHeading'
import { ERROR__FALLBACK, ROUTE_TYPES } from '~lib/constants'
import fetcher from '~lib/fetcher'
import PageImageContent from '~styles/system/layouts/PageImageContent'
// import getByListing from '~utils/next/getByListing'
import getBySlug from '~utils/next/getBySlug'
import getNextPageStatus from '~utils/next/getNextPageStatus'

const routeType = ROUTE_TYPES.SHOWS

const ShowsSlug = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    items: itemsFallback,
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
      <PageImageContent data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  ...props
}) => {
  const { slug } = props?.params
  const pathVariables = {
    dataType: 5,
    hasMeta: false,
    isPage: false,
    isIndex: false,
    meta: routeType,
    routeType,
    slug,
    url: `${routeType}/${slug}`,
  }
  const data = await getBySlug({ pathVariables, routeType, slug })
  return {
    props: { data, preview, ...pathVariables, ...props },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { slug: 'jfle' } }],
    fallback: true,
  }
  // const paths = []
  // const pathVariables = {
  //   dataType: 2,
  //   hasMeta: false,
  //   isPage: false,
  //   isIndex: true,
  //   meta: routeType,
  //   routeType,
  //   slug: null,
  //   url: `/${routeType}`,
  // }
  // const data = await getByListing({ pathVariables, routeType })
  // const items = data?.items?.results
  // _map(items, (item) => paths.push(`/${routeType}/${item?.data?.slug}`))

  // console.dir(`paths`)
  // console.dir(paths)

  // return {
  //   paths,
  //   fallback: 'blocking',
  // }
}

export default ShowsSlug
