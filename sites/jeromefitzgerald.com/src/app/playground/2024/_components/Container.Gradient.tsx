import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'

function ContainerGradient() {
  return (
    <>
      <Box
        className={cx(
          'pointer-events-none fixed top-0 z-30 w-full flex-none',
          'h-[50px] md:h-[35px]',
          'backdrop-blur-xs',
          'opacity-80 md:opacity-90',
          '',
        )}
        data-name="Container: Blur"
        id="container--blur"
      />
      <Box
        className={cx(
          'pointer-events-none fixed top-0 z-40 w-full flex-none',
          'h-[100px] md:h-[80px]',
          'bg-gradient-to-b',
          'from-whiteA-10 dark:from-blackA-10',
          'from-65% md:from-45%',
          '',
        )}
        data-name="Container: Gradient"
        id="container--gradient"
      />
    </>
  )
}

export { ContainerGradient }
