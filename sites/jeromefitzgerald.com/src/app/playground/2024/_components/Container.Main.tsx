import { cx } from '@jeromefitz/ds/utils/cx'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function ContainerContent({ children, className = '' }) {
  return (
    <Flex
      align="start"
      className={cx(
        'relative z-0 overflow-visible',
        'place-content-start items-start',
        className,
      )}
      direction="row"
      gap={{ initial: '0', md: '6' }}
      height="min-content"
      pb="0"
      pt={{ initial: '12', md: '12' }}
      px="0"
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
