import { cx } from '@jeromefitz/ds/utils/cx'

import _size from 'lodash/size.js'
import pluralize from 'pluralize'
// import { Suspense } from 'react'

import { getPropertyTypeDataPodcast } from '../../app/(notion)/_config'
import {
  getRelationTitle,
  // RelationIndividual,
  RelationIndividuals,
  // RelationLoading,
} from './index'

/**
 * @todo(notion) hrm, how do we get data from two tables over?
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Relations({ properties, relations, relationsSecondary }) {
  return (
    <div
      className={cx(
        'grid w-full grid-cols-12 gap-x-4 gap-y-8',
        // 'md:[&>*:nth-child(2)]:col-start-9',
        '',
      )}
    >
      {relations.map((relation) => {
        const id = getPropertyTypeDataPodcast(properties, 'ID')
        const items = getPropertyTypeDataPodcast(properties, relation)
        if (!items) return null
        const itemsCount = _size(items)
        if (itemsCount === 0) return null
        const title = pluralize(getRelationTitle(relation), itemsCount)
        return (
          <div
            className={cx(
              'col-span-6',
              'md:col-span-4',
              // 'first:col-span-12',
              // 'md:first:col-span-8',
              '',
            )}
            key={`${id}-${relation}`}
          >
            <p className={cx('pb-3 font-extrabold tracking-tight uppercase', '')}>
              <strong>{title}</strong>
            </p>
            <ul>
              {/* {Array(itemsCount)
                .fill(0)
                .map((_, i) => {
                  const item = items[i]
                  const { id } = item

                  return (
                    <li key={id} className={cx('mb-2 md:mb-0.5')}>
                      <Suspense fallback={<RelationLoading />}>
                        <RelationIndividual id={id} />
                      </Suspense>
                    </li>
                  )
                })} */}
              <RelationIndividuals items={items} />
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export { Relations }
