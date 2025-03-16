import { cx } from '@jeromefitz/ds/utils/cx'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

function SectionSpacer() {
  return (
    <Flex
      className={cx(
        'bg-green-4',
        'flex-none content-start items-start justify-self-end overflow-visible',
      )}
      direction="row"
      gap="9"
      height="100%"
      justify="end"
      position="relative"
      width="100%"
      wrap="nowrap"
    />
  )
}

export { SectionSpacer }
