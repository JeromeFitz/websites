import Layout from '~components/Layout'
import { getRouterNode } from '~lib/notion/app/routes'

const Page = ({ ...props }) => {
  const { dataType, routeType, url } = props

  /**
   * @data
   */
  let routerNode = '_unsupported'
  let RouterComponent = getRouterNode[routerNode]

  const { info = null } = props?.data
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
      id={props.info.id}
      properties={props.info.properties}
      routeType={routeType}
      url={url}
    >
      <RouterComponent routerNode={routerNode} {...props} />
    </Layout>
  )
}

export default Page
