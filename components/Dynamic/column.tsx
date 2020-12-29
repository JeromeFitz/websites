import React from 'react'

const column = ({ children: component }) => {
  const children = component.props.children || ''
  return <div className="column">{children}</div>
}

export default column
