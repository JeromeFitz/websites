import { cx } from '@jeromefitz/ds/utils/cx'

import { Grid } from '@/components/Grid/index'

import { NavigationDesktop } from './Navigation.desktop'
import { NavigationMobile } from './Navigation.mobile'

function Navigation() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full md:sticky',
        'col-span-full',
        'bg-white dark:bg-black',
        'md:bg-whiteA-12 md:dark:bg-blackA-11',
        'md:backdrop-blur-xs',
        'md:border-grayA-3 md:border-b-1',
        'md:drop-shadow-xs',
        'md:dark:shadow-white/5 md:dark:drop-shadow-lg',
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
