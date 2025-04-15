import _filter from 'lodash/filter.js'
import _startsWith from 'lodash/startsWith.js'

const FIND_ALT = 'ALT: '

function getImageAlt(comments: any) {
  const comment = comments[0]
  const c = _filter(comments, (comment: any) =>
    _startsWith(comment?.rich_text[0]?.plain_text, FIND_ALT),
  )
  return !!c && c.length > 0
    ? c[0]?.rich_text[0]?.plain_text.slice(FIND_ALT.length)
    : comment
      ? comment?.rich_text[0]?.plain_text
      : ''
}

export { getImageAlt }
