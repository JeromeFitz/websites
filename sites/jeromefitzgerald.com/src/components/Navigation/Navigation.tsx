import { cx } from '@jeromefitz/ds/utils/cx'

import { Grid } from '@/components/Grid/index'

import { NavigationDesktop } from './Navigation.desktop'
import { NavigationMobile } from './Navigation.mobile'

function Navigation() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full lg:sticky ',
        'col-span-full',
        'bg-white dark:bg-black',
        'lg:bg-whiteA-12 lg:dark:bg-blackA-11',
        'lg:backdrop-blur-sm',
        'lg:border-b-1 lg:border-grayA-3',
        'lg:drop-shadow-sm',
        'lg:dark:shadow-white/5  lg:dark:drop-shadow-lg',
        '',
        'lg:py-2',
      )}
    >
      <NavigationDesktop />
      <NavigationMobile />
    </Grid>
  )
}

export { Navigation }
