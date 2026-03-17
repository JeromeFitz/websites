import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { cx } from '@/utils/cx'

// @ts-ignore
function ContainerSite({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      className={cx(
        'relative overflow-visible',
        'h-min w-auto',
        // 'min-h-[100vh]',
        'flex flex-col flex-nowrap content-center items-center justify-end gap-0',
        'p-[0_12px_12px]',
        'md:gap-[80px] md:p-[0_24px_24px]',
      )}
      data-name="Container: Site"
      direction="column"
      gap="9"
      id="container--site"
      justify="end"
      position="relative"
      wrap="nowrap"
    >
      {children}
    </Flex>
  )
}

export { ContainerSite }
