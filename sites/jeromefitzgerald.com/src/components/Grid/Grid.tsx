import type { GridProps } from '@radix-ui/themes/dist/esm/components/grid.js'
import type { ReactNode } from 'react'

import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { forwardRef } from 'react'

interface AdditionalProps {
  children: ReactNode
  className?: string
}
type GridImpl = AdditionalProps & GridProps

const GridImpl = forwardRef(function GridImpl(
  { children, className, ...props }: GridImpl,
  forwardedRef,
) {
  return (
    <Grid
      className={className}
      columns="2"
      flow="column"
      gap="2"
      mb="1"
      mr="1"
      p={{ initial: '4', md: '8' }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
      width="100%"
      {...props}
    >
      {children}
    </Grid>
  )
})

export { GridImpl as Grid }
