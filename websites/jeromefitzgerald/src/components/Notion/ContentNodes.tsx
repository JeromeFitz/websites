import _map from 'lodash/map'

import { getContentNode } from '~components/Notion'

import getContentNodes from './utils/getContentNodes'

const ContentNodes = ({ content, images }) => {
  return (
    <>
      {_map(getContentNodes({ content, images }), (node: any) => {
        if (node.type === 'ul') {
          const UL = getContentNode['bulleted_list']
          return <UL key={node.id}>{node.node}</UL>
        }
        if (node.type === 'ol') {
          const OL = getContentNode['numbered_list']
          return <OL key={node.id}>{node.node}</OL>
        }
        return node.node
      })}
    </>
  )
}

export default ContentNodes
