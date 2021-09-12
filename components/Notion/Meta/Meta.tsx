import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import pluralize from 'pluralize'

import usePage from '~hooks/notion/usePage'
import useRelation, { setRelation } from '~hooks/notion/useRelation'
import getTitle from '~lib/notion/getTitle'
import rangeMap from '~utils/rangeMap'

const LiGhost = () => (
  <div className="max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-2">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

// @todo(react)
//  Cannot update a component (`MetaHidden`) while
//  rendering a different component(`MetaHidden`)
const MetaHidden = ({ id }) => {
  const { data: relations } = useRelation()
  const { data, isError, isLoading } = usePage({ id })
  if (isLoading || isError) return null
  void setRelation(relations, data)
  return null
}

const Meta = ({ ids, swrKey, title }) => {
  const { data: relations } = useRelation()
  const data = _orderBy(
    // @todo(any)
    _filter(relations, (relation: any) => ids.includes(relation.id)),
    ['data.title'],
    ['asc']
  )

  return (
    <div className="flex flex-col" id={`${swrKey}--container`}>
      {/* @todo(react) */}
      {_map(ids, (id) => (
        <MetaHidden id={id} />
      ))}
      <h5 className="font-semibold">{pluralize(getTitle(title), ids.length)}</h5>
      <ul className="flex flex-col ">
        {!!data || _size(data) > 0
          ? // @todo(any)
            _map(data, (relation: any) => (
              <li id={`id--${relation.id}`}>{relation.data.title}</li>
            ))
          : rangeMap(ids.length, (i) => {
              return _size(data) > 0 ? (
                <LiGhost key={`${swrKey}--${i}`} />
              ) : (
                <LiGhost key={`${swrKey}--${i}`} />
              )
            })}
      </ul>
    </div>
  )
}

export default Meta
