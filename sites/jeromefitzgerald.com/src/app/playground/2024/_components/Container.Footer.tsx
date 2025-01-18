import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

import { ContainerFooterClient } from './Container.Footer.Client'
import { Currently } from './Currently'

function ContainerFooter() {
  return (
    <Box
      className={cx(
        'relative size-full flex-[0_0_auto] md:flex-none',
        'z-0 md:z-10',
      )}
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      <Box className={cx('contents')}>
        <footer
          className={cx(
            'relative flex h-min w-full flex-col flex-nowrap place-content-start items-start gap-12 overflow-visible p-0',
            'md:px-0 md:pb-0 md:pt-28',
          )}
          style={{ opacity: 1 }}
        >
          <Currently />
          <ContainerFooterClient />
        </footer>
      </Box>
    </Box>
  )
}

export { ContainerFooter }
