import { cx } from '@jeromefitz/ds/utils/cx'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function ContainerContent({ children, className = '' }) {
  return (
    <Flex
      align="start"
      className={cx(
        'relative z-0 overflow-visible',
        // 'flex flex-none flex-col flex-nowrap place-content-start items-start gap-7',
        // 'h-min w-full',
        // 'px-0 pt-24 pb-0 md:px-0 md:pt-24 md:pb-0',
        className,
      )}
      direction="row"
      gap="2"
      height="min-content"
      px="1"
      width="100%"
      wrap="nowrap"
    >
      {children}
    </Flex>
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
