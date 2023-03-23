import _map from 'lodash/map'
import React from 'react'

import { CONTENT_NODE_TYPES } from './constants'
import getContentNodes from './utils/getContentNodes'

import { getContentNode } from './index'

const { OL, UL, NUMBERED_LIST, BULLETED_LIST } = CONTENT_NODE_TYPES

const ContentNodes = ({ content, images }) => {
  // console.dir(`ContentNodes`)
  const WrapComponent = React.Fragment

  return (
    <>
      {_map(getContentNodes({ content, images }), (node: any) => {
        // console.dir(`map > getContentNodes (${node?.type})`)
        // console.dir(node)
        if (node?.type === OL || node?.type === UL) {
          const ListType =
            node?.type === OL
              ? getContentNode[NUMBERED_LIST]
              : getContentNode[BULLETED_LIST]
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
