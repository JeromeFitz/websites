import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

function ContainerSection({ children }) {
  return (
    <Box
      className={cx(
        'rounded-3 relative z-0 flex h-min w-full flex-[0_0_auto] flex-col flex-nowrap content-start items-start justify-start gap-10 overflow-visible p-[24px_0_100px]',
        '!md:grid md:justify-center md:gap-6 md:p-[100px_0] ',
        'md:grid md:auto-rows-min md:grid-cols-[repeat(4,minmax(200px,1fr))] md:grid-rows-[repeat(1,min-content)]',
      )}
      data-name="Container Section / Body"
    >
      {children}
    </Box>
  )
}

export { ContainerSection }
