import _drop from 'lodash/drop'
import _dropRight from 'lodash/dropRight'
import _first from 'lodash/first'
import _includes from 'lodash/includes'
import _isInteger from 'lodash/isInteger'
import _join from 'lodash/join'
import _last from 'lodash/last'
import _size from 'lodash/size'

import { ROUTE_TYPES, SLUG__HOMEPAGE } from '~utils/notion/helper'

const routeTypesArray = Object.keys(ROUTE_TYPES)

// @todo(complexity) 16
// eslint-disable-next-line complexity
const getPathVariables = (catchAll: any) => {
  const size: number = _size(catchAll)
  const first: string = _first(catchAll)
  const last: string = _last(catchAll)

  const meta =
    size > 1 &&
    _includes([ROUTE_TYPES.blog, ROUTE_TYPES.events, ROUTE_TYPES.podcasts], first)
      ? _drop(catchAll)
      : _drop(_dropRight(catchAll))
  const routeType =
    first === last && !_includes(routeTypesArray, first) ? 'pages' : first
  const slug = first !== last && !_isInteger(parseInt(last)) ? last : first

  const isPage = routeType === 'pages'
  const isIndex = slug === first
  const hasMeta = !!meta && _size(meta) !== 0

  const url = isPage && first === SLUG__HOMEPAGE ? '' : _join(catchAll, '/')

  /**
   * @test cases
   */
  // 1 = /colophon
  // 2 = /blog, /events, /podcasts
  // 3 = /blog/2020, /blog/2020/05, /blog/2020/05/09
  //     /events/2020, /events/2020/05, /events/2020/05/09,
  // 4 = /blog/2020/05/09/title, /events/2020/05/09/title,
  //     /podcasts/knockoffs/i-know-what-you-did-last-summer
  // 5 = /shows/alex-o-jerome, /events/2020/05/09/jerome-and, /podcasts/knockoffs
  /**
   * @debug
   */
  console.dir(`------`)
  console.dir(`routeType: ${routeType}`)
  console.dir(`slug: ${slug}`)
  console.dir(`isPage:  ${isPage}`)
  console.dir(`isIndex:  ${isIndex}`)
  console.dir(`hasMeta: ${hasMeta}`)
  console.dir(`meta:`)
  console.dir(meta)

  /**
   * ------
   */
  let dataType = 0
  if (isPage) {
    dataType = 1
  } else if (isIndex && !hasMeta) {
    dataType = 2
  } else if (isIndex && hasMeta) {
    dataType = 3
  } else if (hasMeta) {
    dataType = 4
  } else {
    dataType = 5
  }

  const pathVariables = {
    dataType,
    hasMeta,
    isPage,
    isIndex,
    meta,
    routeType,
    slug,
    url,
  }

  return pathVariables
}

export default getPathVariables
