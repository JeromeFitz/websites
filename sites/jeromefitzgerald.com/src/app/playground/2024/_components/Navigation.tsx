import { cx } from '@jeromefitz/ds/utils/cx'

import { NavigationButton } from './Navigation.Button'
import { NavigationPrimary } from './Navigation.Primary'
import { NavigationSecondary } from './Navigation.Secondary'
import { NavigationSeparator } from './Navigation.Separator'
import { NavigationTertiary } from './Navigation.Tertiary'

function Navigation() {
  return (
    <>
      <nav
        className={cx(
          'relative mr-6 flex h-12 w-[unset] flex-row flex-nowrap content-start items-start justify-between gap-2 overflow-visible p-0',
          'drop-shadow-xs',
          'md:w-full md:justify-start',
        )}
        id="nav"
        style={{ height: '100%', opacity: 1 }}
      >
        <NavigationPrimary />
        <NavigationSeparator className="hidden md:inline-flex" />
        <NavigationSecondary />
        <NavigationSeparator className="hidden md:inline-flex" />
        <NavigationTertiary className="hidden md:inline-flex" />
      </nav>
      <NavigationButton />
    </>
  )
}

export { Navigation }
