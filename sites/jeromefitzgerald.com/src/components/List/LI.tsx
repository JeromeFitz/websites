import { CornerBottomLeftIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { cx } from '@/utils/cx'

function LI({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
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
