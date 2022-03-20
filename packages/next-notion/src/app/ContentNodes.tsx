import _map from 'lodash/map'
import * as React from 'react'

// import NoSSR from './components/NoSSR'
import getContentNodes from './utils/getContentNodes'

import { getContentNode } from './index'

const ContentNodes = ({ content, images }) => {
  // let i = 0
  // @todo(types)
  const WrapComponent: any = React.Fragment

  return (
    <>
      {_map(getContentNodes({ content, images }), (node: any) => {
        /**
         * @hack(ssr)
         * X elements that would (probably) be in viewport
         *
         * @note(ssr)
         * With SSG/ISG there is not enough gain to do this, especially
         *  if the user has JS turned off.
         */
        // if (i > 9) {
        //   WrapComponent = NoSSR
        // }
        // i++

        if (node?.type === 'ol' || node?.type === 'ul') {
          const ListType =
            node?.type === 'ol'
              ? getContentNode['numbered_list']
              : getContentNode['bulleted_list']
          return (
            <WrapComponent key={node.id}>
              <ListType>{node.node}</ListType>
            </WrapComponent>
          )
        }
        return <WrapComponent key={node.id}>{node.node}</WrapComponent>
      })}
    </>
  )
}

export default ContentNodes
