import _size from 'lodash/size'
import React from 'react'

const files = ({ content }) => {
  return _size(content) > 0 ? (
    <React.Fragment>content[0].external.url</React.Fragment>
  ) : null
}

export default files
