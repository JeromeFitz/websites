import { cx } from '@jeromefitz/ds/utils/cx'

import { CornerBottomLeftIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function LI({ children, className = '' }) {
  return (
    <Flex
      asChild
      className={cx('list-none items-baseline', className)}
      direction="row"
      gap="2"
      justify="start"
    >
      <li>
        <CornerBottomLeftIcon />
        {children}
      </li>
    </Flex>
  )
}

export { LI }
