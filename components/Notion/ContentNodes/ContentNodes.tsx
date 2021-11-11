import _map from 'lodash/map'

import { OL, UL } from '~components/Notion/Listing'
import getContentNodes from '~utils/notion/getContentNodes'

const ContentNodes = ({ content, images }) => {
  return (
    <>
      {_map(getContentNodes({ content, images }), (node: any) => {
        if (node.type === 'ul') {
          return <UL key={node.id}>{node.node}</UL>
        }
        if (node.type === 'ol') {
          return <OL key={node.id}>{node.node}</OL>
        }
        // if (node.type === 'image') {
        //   return (
        //     <>
        //       <h5 key="image-here">Image Here</h5>
        //       {node.node}
        //     </>
        //   )
        // }
        return node.node
      })}
    </>
  )
}

export default ContentNodes
