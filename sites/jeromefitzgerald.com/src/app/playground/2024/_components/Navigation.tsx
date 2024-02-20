import { cx } from '@jeromefitz/ds/utils/cx'

import { Grid } from '~app/playground/2024/_components/Grid'

import { NavigationDesktop } from './Navigation.desktop'
import { NavigationMobile } from './Navigation.mobile'

function Navigation() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full md:sticky ',
        'col-span-4',
        'bg-white dark:bg-black',
        'md:border-b-1 md:border-[var(--gray-a3)]',
        'md:drop-shadow-sm',
        'md:dark:shadow-white/5  md:dark:drop-shadow-lg',
        '',
        'md:py-2',
      )}
    >
      <NavigationDesktop />
      <NavigationMobile />
    </Grid>
  )
}

export { Navigation }
