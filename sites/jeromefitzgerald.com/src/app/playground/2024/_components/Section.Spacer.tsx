import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

function SectionSpacer() {
  return (
    <Box
      className={cx(
        'bg-green-4 h-full',
        // 'min-w-[309px]',
        // 'h-min',
        'relative flex w-full flex-none flex-col flex-nowrap content-start items-start justify-end gap-14 justify-self-end overflow-visible',
        // 'p-[0_0_12px]',
        // 'md:self-center md:p-[0_0_120px]',
      )}
    />
  )
}

export { SectionSpacer }
