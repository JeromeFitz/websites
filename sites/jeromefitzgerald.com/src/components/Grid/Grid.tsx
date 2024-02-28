/**
 * @hack(radix-ui) To side-step the Grid init issue this will be
 *                 duplicated in Tailwind
 */
import { cx } from '@jeromefitz/ds/utils/cx'

import type { GridProps } from '@radix-ui/themes/dist/esm/components/grid.js'
import type { ReactNode } from 'react'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
/**
 * @note(radix-ui) importing here does not tree shake yet
 *                 full library is imported (Alert Dialog, Avatar, etc.)
 */
// import { Grid } from '@radix-ui/themes'
/**
 * @note(radix-ui) The way we are calling this component in Layout
 *                 results in a circular reference
 *
 * Error: Cannot access 'gridPropDefs' before initialization
 *
 */
// import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { forwardRef } from 'react'

type AdditionalProps = {
  children: ReactNode
  className?: string
}
type GridImpl = GridProps & AdditionalProps
// const GridImpl = forwardRef(function GridImpl(
//   { children, className, ...props }: GridImpl,
//   forwardedRef,
// ) {
//   return (
//     <Grid
//       className={className}
//       columns="12"
//       flow="column"
//       gap="2"
//       mb="1"
//       mr="1"
//       p={{ initial: '4', lg: '8' }}
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       ref={forwardedRef}
//       width="100%"
//       {...props}
//     >
//       {children}
//     </Grid>
//   )
// })

const GridImpl = forwardRef(function GridImpl(
  { children, className, ...props }: GridImpl,
  forwardedRef,
) {
  return (
    <Box
      // className={cx(`grid grid-cols-12 gap-2`, className)}
      className={cx(
        `[--grid-template-columns:repeat(12,_minmax(0,_1fr))]`,
        className,
      )}
      mb="1"
      mr="1"
      p={{ initial: '4', lg: '8' }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
      style={{
        alignItems: 'stretch',
        boxSizing: 'none',
        display: 'grid',
        gap: 'var(--space-2)',
        gridAutoFlow: 'column',
        // gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateColumns: 'var(--grid-template-columns)',
        gridTemplateRows: 'none',
        justifyContent: 'flex-start',
      }}
      width="100%"
      {...props}
    >
      {children}
    </Box>
  )
})

export { GridImpl as Grid }
