import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'
// import { useSWRConfig } from 'swr'

import { MetaRelations } from '~components/Notion/Meta'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Relations = ({ id, isIndex, properties, relationsMap, routeType, slug }) => {
  // const { cache } = useSWRConfig()
  // console.dir(`cache`)
  // console.dir(cache)
  // @hack(notion)
  const hasRelations = !isIndex && !!relationsMap
  if (!hasRelations) {
    return null
  }

  return (
    <div
      id="relations--container"
      className={cx('grid', 'grid-cols-2 gap-3', 'md:grid-cols-3 md:gap-4')}
    >
      {_map(relationsMap, (relationKey) => {
        const ids = properties[relationKey]
        if (_size(ids) === 0) {
          return null
        } else {
          return (
            <MetaRelations
              id={id}
              ids={ids}
              key={`relations--${id}--${relationKey.toLowerCase()}`}
              relationKey={relationKey}
              routeType={routeType}
            />
          )
        }
      })}
    </div>
  )
}

export default Relations
