import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
// import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// // eslint-disable-next-line no-restricted-imports
// import NextLink from 'next/link'

import { NavigationButtonClient } from './Navigation.Button.Client'

function NavigationButton() {
  return (
    <Box
      className={cx(
        'fixed top-6 right-6 z-50 h-10 w-auto flex-none gap-3',
        'hidden md:flex',
        'drop-shadow-xs',
        'backdrop-blur-xs',
        // 'drop-shadow-lg active:drop-shadow-md',
      )}
    >
      <NavigationButtonClient />
      {/* <Button
        asChild
        className={cx(
          'rounded-3 h-full px-8 transition-colors',
          'backdrop-blur-xs transition-all',
        )}
        color="gray"
        variant="soft"
      >
        <NextLink href="/about">
          <Text size="3">About</Text>
        </NextLink>
      </Button> */}
    </Box>
  )
}

export { NavigationButton }
