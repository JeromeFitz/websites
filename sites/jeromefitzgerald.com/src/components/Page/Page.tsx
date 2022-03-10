import { PageHeading, SkeletonHeading } from '@jeromefitz/design-system/components'
import { ERROR__FALLBACK } from '@jeromefitz/shared/src/lib/constants'
import { getNextPageStatus } from 'next-notion/src/utils'
import dynamic from 'next/dynamic'

import { Layout } from '~components/Layout'
import { getRouterNode } from '~routes/index'

const IndexShowListing = dynamic(() => import('~custom/IndexShowListing'), {
  ssr: false,
})

const Page = ({ ...props }) => {
  const { data, dataType, error, isHomepage, preview, routeType, url } = props

  const { is404, isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error,
    url
  )

  if (isLoading) return <SkeletonHeading />
  if (is404)
    return (
      <PageHeading
        description={`Hrm, this page does not seem to want to be found.`}
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

  /**
   * @data
   */
  let routerNode = '_unsupported'
  let RouterComponent = getRouterNode[routerNode]

  const { info = null } = data
  if (info === null) {
    // @todo(404|fallback)
    return <RouterComponent routerNode={routerNode} {...props} />
  }

  routerNode = `${routeType}/${dataType}`.toUpperCase()

  /**
   * @refactor
   * Multiple calls to `getRouterNode` to identify fallbacks
   *
   */
  routerNode = !!getRouterNode[routerNode]
    ? routerNode
    : !!getRouterNode[dataType]
    ? dataType
    : '_unsupported'
  RouterComponent = getRouterNode[routerNode]
  /* ------------------------------------------------------ */

  return (
    <Layout
      // id={info.id}
      info={info}
      preview={preview}
      routeType={routeType}
      url={url}
    >
      <RouterComponent routerNode={routerNode} {...props} />
      {isHomepage && <IndexShowListing />}
    </Layout>
  )
}

export { Page }
