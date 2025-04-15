import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

import { Navigation } from '@/components/Navigation/Navigation'
import { cx } from '@/utils/cx'

function ContainerNavigation() {
  return (
    <Box
      className={cx(
        'fixed inset-x-3 top-6 z-40 flex-none',
        'h-[40px] w-full',
        'md:ml-3',
      )}
      data-name="Container: Navigation"
      id="container--navigation"
    >
      <Box className="contents size-full">
        <Navigation />
      </Box>
    </Box>
  )
}

export { ContainerNavigation }
