import _size from 'lodash/size'
import * as React from 'react'

const rich_text = ({ content }) => {
  // console.dir(`> rich_text`)
  // console.dir(content)
  return _size(content) > 0 ? (
    <React.Fragment>content[0]?.plain_text</React.Fragment>
  ) : (
    <React.Fragment />
  )
}

export default rich_text
