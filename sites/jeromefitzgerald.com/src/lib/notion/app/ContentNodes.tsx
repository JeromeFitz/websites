import _map from 'lodash/map'
import * as React from 'react'

import NoSSR from '~components/NoSSR'
import { getContentNode } from '~lib/notion/app'

import getContentNodes from './utils/getContentNodes'

const ContentNodes = ({ content, images }) => {
  let i = 0
  let WrapComponent: any = React.Fragment

  return (
    <>
      {_map(getContentNodes({ content, images }), (node: any) => {
        /**
         * @hack(ssr)
         * X elements that would (probably) be in viewport
         */
        if (i > 9) {
          WrapComponent = NoSSR
        }
        i++

        if (node?.type === 'ul') {
          const UL = getContentNode['bulleted_list']
          return (
            <WrapComponent key={node.id}>
              <UL>{node.node}</UL>
            </WrapComponent>
          )
        }
        if (node?.type === 'ol') {
          const OL = getContentNode['numbered_list']
          return (
            <WrapComponent key={node.id}>
              <OL>{node.node}</OL>
            </WrapComponent>
          )
        }
        return <WrapComponent key={node.id}>{node.node}</WrapComponent>
      })}
    </>
  )
}

export default ContentNodes
