import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

function ContainerSite({ children }) {
  return (
    <Box
      className={cx(
        'relative overflow-visible',
        'h-min min-h-screen w-auto',
        'flex flex-col flex-nowrap content-center items-center justify-end gap-0',
        'p-[0_12px_12px]',
        'md:gap-[80px] md:p-[0_24px_24px]',
      )}
      data-name="Container: Site"
      id="container--site"
    >
      {children}
    </Box>
  )
}

export { ContainerSite }
