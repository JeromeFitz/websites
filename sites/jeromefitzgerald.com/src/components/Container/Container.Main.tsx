import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { cx } from '@/utils/cx'

function ContainerContent({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Flex
      align="start"
      className={cx(
        'relative z-0 overflow-visible',
        'place-content-start items-start',
        className,
      )}
      data-name="Container: Main"
      direction="row"
      gap={{ initial: '0', md: '6' }}
      height="min-content"
      id="container--main"
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

function ContainerWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <ContainerContent className="!p-0 !pb-24 md:flex-row">
      {children}
    </ContainerContent>
  )
}

export { ContainerContent, ContainerWithSidebar }
