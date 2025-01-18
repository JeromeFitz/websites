import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

function ContainerContent({ children, className = '' }) {
  return (
    <Box
      className={cx(
        'relative z-0 overflow-visible',
        'flex flex-none flex-col flex-nowrap place-content-start items-start gap-7',
        'h-min w-full',
        'px-0 pb-0 pt-24 md:px-0 md:pb-0 md:pt-24',
        className,
      )}
    >
      {children}
    </Box>
  )
}

function ContainerWithSidebar({ children }) {
  return (
    <ContainerContent className="!p-0 !pb-24 md:flex-row">
      {children}
    </ContainerContent>
  )
}

export { ContainerContent, ContainerWithSidebar }
