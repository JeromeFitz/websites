import _size from 'lodash/size'
import React from 'react'

const rich_text = ({ content }) => {
  return _size(content) > 0 ? (
    <React.Fragment>content[0].plain_text</React.Fragment>
  ) : null
}

export default rich_text
