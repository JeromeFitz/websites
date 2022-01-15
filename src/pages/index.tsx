import getPathVariables from '@jeromefitz/notion/dist/queries/getPathVariables'
import useSWR from 'swr'

import { Page, PageHeading, SkeletonHeading } from '~components/Layout'
import ListingShows from '~components/Notion/Listing/ListingShows'
import { notionConfig } from '~config/websites'
import mockData from '~data/mock/notion/shows'
import {
  nextWeirdRoutingSkipData,
  revalidate,
  ERROR__FALLBACK,
} from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getNextPageStatus from '~utils/getNextPageStatus'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { PAGES__HOMEPAGE } = notionConfig

const Index = (props) => {
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

  // @todo(notion) make dynamic w/ skeleton
  const { images, items } = mockData

  // @todo(config) dynamic site selection
  const hasShows = process.env.NEXT_PUBLIC__SITE === 'jeromefitzgerald.com'

  return (
    <>
      <Page data={data} props={props} />
      {hasShows && <ListingShows images={images} items={items?.results} />}
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
  const pathVariables = getPathVariables({ config: notionConfig, catchAll })

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

export default Index
