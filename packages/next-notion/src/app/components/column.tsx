import _map from 'lodash/map'

import getContentType from '../utils/getContentType'

const column = ({ content, has_children }) => {
  if (!has_children) return null
  const nodeContent = _map(content.column.children, (content) =>
    getContentType(content)
  )
  return (
    <div className="my-3 flex flex-[1_1] flex-col md:my-3 md:pr-5">
      {nodeContent}
    </div>
  )
}

export default column
