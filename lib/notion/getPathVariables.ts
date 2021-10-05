import _drop from 'lodash/drop'
import _dropRight from 'lodash/dropRight'
import _first from 'lodash/first'
import _includes from 'lodash/includes'
import _isInteger from 'lodash/isInteger'
import _join from 'lodash/join'
import _last from 'lodash/last'
import _size from 'lodash/size'

import { SLUG__HOMEPAGE } from '~lib/constants'

const routeTypesArray = [
  'blog',
  'episodes',
  'events',
  'pages',
  'people',
  'podcasts',
  'seo',
  'shows',
  'users',
  'venues',
]

const getPathVariables = (catchAll: any) => {
  const size: number = _size(catchAll)
  const first: string = _first(catchAll)
  const last: string = _last(catchAll)

  const meta =
    size > 1 && _includes(['blog', 'events'], first)
      ? _drop(catchAll)
      : _drop(_dropRight(catchAll))
  const routeType =
    first === last && !_includes(routeTypesArray, first) ? 'pages' : first
  const slug = first !== last && !_isInteger(parseInt(last)) ? last : first

  const isPage = routeType === 'pages'
  const isIndex = slug === first
  const hasMeta = !!meta && _size(meta) !== 0

  const url = isPage && first === SLUG__HOMEPAGE ? '' : _join(catchAll, '/')

  const pathVariables = { hasMeta, isPage, isIndex, meta, routeType, slug, url }

  return pathVariables
}

export default getPathVariables
