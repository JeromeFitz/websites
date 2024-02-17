import { cx } from '@jeromefitz/ds/utils/cx'

// import type { TagType } from './index'

import { Tag } from './index'

// const tags: TagType[] = [
//   { color: 'brown', id: 'game-show', name: 'game-show' },
//   { color: 'violet', id: 'improv', name: 'improv' },
//   { color: 'plum', id: 'sketch', name: 'sketch' },
//   { color: 'amber', id: 'music', name: 'music' },
//   { color: 'grass', id: 'musical', name: 'musical' },
//   { color: 'crimson', id: 'stand-up', name: 'stand-up' },
//   { color: 'gray', id: 'unknown', name: 'unknown' },
// ]

function Tags({ tags }) {
  return (
    <>
      <div className={cx('flex min-h-[1.5rem] flex-wrap gap-[0.5rem]', 'mr-2')}>
        {tags.map((tag) => {
          return <Tag key={tag.id} tag={tag} />
        })}
      </div>
    </>
  )
}

export { Tags }
