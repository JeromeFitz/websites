import Layout from '~components/Layout'
import { getRouterNode } from '~lib/notion/app/routes'

const Page = ({ ...props }) => {
  const {
    // content: contentFallback,
    // info: infoFallback,
    // images: imagesFallback,
    // items: itemsFallback,
    //
    dataType,
    // hasMeta,
    // isPage,
    // isIndex,
    routeType,
    // slug,
    url,
  } = props
  // console.dir(`*** Page`)
  // console.dir(`> props`)
  // console.dir(props)

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

  // const isInfoObjectPage = !!info && info?.object === 'page'
  // console.dir(`isInfoObjectPage: ${isInfoObjectPage}`)
  // console.dir(`dataType:         ${dataType}`)
  // console.dir(`routerNode:       ${routerNode}`)

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
