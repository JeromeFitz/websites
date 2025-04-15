import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { cx } from '@/utils/cx'

import { NavigationButton } from './Navigation.Button'
import { NavigationPrimary } from './Navigation.Primary'
import { NavigationSecondary } from './Navigation.Secondary'
import { NavigationSeparator } from './Navigation.Separator'
import { NavigationTertiary } from './Navigation.Tertiary'

function Navigation() {
  return (
    <>
      <Flex
        asChild
        className={cx(
          'content-start items-center overflow-visible',
          'drop-shadow-xs',
        )}
        direction="row"
        gap="2"
        height="calc(var(--spacing) * 12)"
        justify={{ initial: 'between', md: 'start' }}
        mr="6"
        p="0"
        position="relative"
        style={{ height: '100%', opacity: 1 }}
        width={{ initial: 'unset', md: '100%' }}
        wrap="nowrap"
      >
        <nav id="nav">
          <NavigationPrimary />
          <NavigationSeparator className="hidden md:inline-flex" />
          <NavigationSecondary />
          <NavigationSeparator className="hidden md:inline-flex" />
          <NavigationTertiary className="hidden md:inline-flex" />
        </nav>
      </Flex>
      <NavigationButton />
    </>
  )
}

export { Navigation }
