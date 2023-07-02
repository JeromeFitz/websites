import { cx } from '@jeromefitz/shared/src/utils'

function Tags({ tags, className = '', classNameTag = '' }) {
  return (
    <ul
      className={cx(
        'flex flex-row flex-wrap items-start align-top',
        'mt-4',
        className
      )}
    >
      {tags?.map((tag) => {
        const { color, id, name } = tag
        return (
          <li
            key={id}
            className={cx(
              `notion-${color} notion-${color}_background`,
              'relative rounded-full text-center font-semibold normal-case',
              // mobile (vertical sometimes)
              '-left-1.5 my-0 mb-2 mr-2',
              'px-2 py-3',
              // horizontal
              // 'px-3 py-2',
              // desktop
              'md:left-0 md:my-2 md:mr-2',
              'md:px-4 md:py-1',
              classNameTag,
              ''
            )}
            style={{}}
          >
            {name}
          </li>
        )
      })}
    </ul>
  )
}

export { Tags }
