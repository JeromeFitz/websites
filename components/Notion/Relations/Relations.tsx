import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'

import Meta from '~components/Notion/Meta'

const relationsMap = [
  'peopleCast',
  'peopleWriter',
  'peopleProducer',
  'peopleDirector',
  'peopleDirectorMusical',
  'peopleMusic',
  'peopleDirectorTechnical',
  'peopleCrew',
  'peopleHost',
  'peopleThanks',
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Relations = ({ isIndex, properties, routeType, slug }) => {
  // @hack(notion)
  const hasRelations = !isIndex && !!relationsMap
  if (!hasRelations) {
    return null
  }

  return (
    <div
      id="container--relations"
      className={cx('grid', 'grid-cols-2 gap-3', 'md:grid-cols-3 md:gap-4')}
    >
      {_map(relationsMap, (relationKey) => {
        const ids = properties[relationKey]
        const idsSize = _size(ids)
        const swrKey = `${slug}--${relationKey}`
        if (idsSize === 0) {
          return null
        } else {
          return (
            <Meta
              ids={ids}
              key={`${slug}--${relationKey}--container`}
              swrKey={`/${swrKey}`.toLowerCase()}
              title={relationKey}
            />
          )
        }
      })}
    </div>
  )
}

export default Relations
