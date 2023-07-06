import { cx } from '@jeromefitz/shared/src/utils'
import _size from 'lodash/size'
import pluralize from 'pluralize'
// import { Suspense } from 'react'

import { getPropertyTypeDataEvent } from '~app/(notion)/(config)/utils'

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
        ''
      )}
    >
      {relations.map((relation) => {
        const id = getPropertyTypeDataEvent(properties, 'ID')
        const items = getPropertyTypeDataEvent(properties, relation)
        if (!items) return null
        const itemsCount = _size(items)
        if (itemsCount === 0) return null
        const title = pluralize(getRelationTitle(relation), itemsCount)
        return (
          <div
            className={cx(
              'col-span-6',
              'md:col-span-4 ',
              // 'first:col-span-12',
              // 'md:first:col-span-8',
              ''
            )}
            key={`${id}-${relation}`}
          >
            <h6 className={cx('pb-3 font-extrabold uppercase tracking-tight', '')}>
              {title}
            </h6>
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
