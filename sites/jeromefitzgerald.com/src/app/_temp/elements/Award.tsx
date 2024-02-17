import { cx } from '@jeromefitz/ds/utils/cx'

import { Text } from './index'

function Award({ award }) {
  return (
    <li
      className={cx(
        'flex items-center justify-between gap-4 border-b p-[1.25rem_0] md:p-[.75rem_0]',
      )}
    >
      <div className={cx('')}>
        <div className={cx('')}>
          <Text className={cx('mb-1 text-base font-bold tracking-tight')}>
            {award.body}
          </Text>
          <Text className={cx('font-mono text-sm tracking-tight opacity-80')}>
            {award.label}
          </Text>
        </div>
      </div>
      {award.icon}
    </li>
  )
}

export { Award }
