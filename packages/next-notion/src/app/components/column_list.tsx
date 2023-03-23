import _map from 'lodash/map'

import Column from './column'

const column_list = ({ content, id }) => {
  const nodeContentParent = _map(content.children, (child) => (
    <Column key={child.id} content={child} has_children={child.has_children} />
  ))
  return (
    <div key={id} className="my-4 flex flex-col justify-between md:flex-row">
      {nodeContentParent}
    </div>
  )
}

export default column_list
