/* eslint-disable tailwindcss/no-custom-classname */
import { cx } from '../../utils/cx'

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
              // `text-radix-${color}11 bg-radix-${color}3 dark:bg-radix-${color}3`,
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
