import _merge from 'lodash/merge'
import React from 'react'

const columnContainer = ({ id, content }) => {
  return (
    <div className="columnContainer" key={`${id}--cc`}>
      {content.map((data, dataIndex) => {
        const children = _merge(
          { ...data.props.children },
          {
            key: `${id}--cc--${dataIndex}--children`,
          }
        )
        return (
          <div className="column" key={`${id}--cc--${dataIndex}`}>
            {children}
          </div>
        )
      })}
    </div>
  )
}

export default columnContainer
