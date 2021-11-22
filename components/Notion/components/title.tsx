import _size from 'lodash/size'
import React from 'react'

const title = ({ content }) => {
  return _size(content) > 0 ? (
    <React.Fragment>content[0].plain_text</React.Fragment>
  ) : null
}

export default title
