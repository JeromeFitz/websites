import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import { cx } from '@/utils/cx'

import { NavigationButtonClient } from './Navigation.Button.Client'

function NavigationButton() {
  return (
    <Flex
      className={cx('z-50 hidden drop-shadow-xs backdrop-blur-xs md:flex')}
      display={{ initial: 'none', md: 'flex' }}
      gap="3"
      height="calc(var(--spacing) * 10)"
      position="fixed"
      right={{ initial: '4', md: '5' }}
      top="5"
      width="auto"
    >
      <NavigationButtonClient />
    </Flex>
  )
}

export { NavigationButton }
