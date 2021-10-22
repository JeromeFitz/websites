import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'
import pluralize from 'pluralize'

import { MetaUL } from '~components/Notion/Meta'
import getTitle from '~lib/notion/getTitle'

const Rollups = (props) => {
  // // const { cache } = useSWRConfig()
  // console.dir(`props`)
  // console.dir(props)
  const { properties, routeType } = props
  //
  const rollupMap =
    routeType === 'events'
      ? ['rollupShow', 'rollupLineup']
      : [
          'rollupCast',
          'rollupGuest',
          'rollupHost',
          'rollupWriter',
          'rollupProducer',
          'rollupDirector',
          'rollupDirectorMusical',
          'rollupMusic',
          'rollupDirectorTechnical',
          'rollupCrew',
          'rollupThanks',
          'rollupError',
        ]

  return (
    <div
      id="rollups--container"
      className={cx('grid', 'grid-cols-2 gap-3', 'md:grid-cols-3 md:gap-4', 'mb-12')}
    >
      {_map(rollupMap, (rollup) => {
        const data = properties[rollup]
        if (data === undefined || _size(data) === 0 || data[0] === null) return null
        const id = `rollup--container--${rollup.toLowerCase()}`

        const title = pluralize(getTitle(rollup), data.length)
        return (
          <MetaUL id={id} key={id} title={title}>
            {_map(data, (item, itemIndex) => {
              return (
                <li className={cx('first:pt-2')} key={`${id}-${itemIndex}`}>
                  {item}
                </li>
              )
            })}
          </MetaUL>
        )
      })}
    </div>
  )
}

export default Rollups
