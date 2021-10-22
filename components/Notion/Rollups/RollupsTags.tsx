import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'
import React from 'react'

const RollupsTags = (props) => {
  const { properties } = props
  const rollupMap = ['rollupTags', 'rollupTagsSecondary']

  // console.dir(`RollupsTags`)
  // console.dir(props)

  return (
    <ul className={cx('mt-0 mb-4 flex flex-row flex-wrap gap-2.5')}>
      {_map(rollupMap, (rollup) => {
        const data = properties[rollup]
        if (data === undefined || _size(data) === 0 || data[0] === null) return null

        return (
          <React.Fragment>
            {_map(data, (item) => {
              console.dir(item)
              return (
                <li
                  className={cx(
                    `badge`,
                    // !!item?.data?.tailwindColorBackground &&
                    //   `badge-${item?.data?.tailwindColorBackground}`
                    `bg-black text-white`,
                    `dark:bg-white dark:text-black`,
                    ``
                  )}
                  // key={item?.id}
                >
                  {item}
                </li>
              )
            })}
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default RollupsTags
