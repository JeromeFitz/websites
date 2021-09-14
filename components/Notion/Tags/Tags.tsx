import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'

import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const Tags = ({ data }) => {
  const hasTags = !!data && _size(data) > 0
  if (!hasTags) {
    return null
  }
  return (
    <ul key="tagsKeyDog" className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}>
      {_map(data, (t, tagIndex) => {
        const tag = data[tagIndex]
        return (
          <li
            className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
            key={tag.id}
          >
            {tag.name}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
