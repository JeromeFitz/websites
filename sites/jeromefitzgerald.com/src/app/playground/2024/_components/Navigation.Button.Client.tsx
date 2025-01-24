'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import * as SegmentedControl from '@radix-ui/themes/dist/esm/components/segmented-control.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function NavigationButtonClient() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const [isLoading, isLoadingSet] = useState(true)
  useEffect(() => isLoadingSet(false), [isLoading])

  const handleTheme = (value) => {
    setTimeout(() => {
      setTheme(value)
    }, 125)
  }

  return (
    // </Box>
    <Skeleton loading={isLoading}>
      <Box
        asChild
        className={cx('z-50 h-full rounded-full backdrop-blur transition-colors')}
      >
        <SegmentedControl.Root
          className={cx(
            'size-full',
            'bg-whiteA-3 hover:bg-whiteA-4 active:bg-whiteA-5',
            'dark:bg-blackA-3 hover:dark:bg-blackA-4 active:dark:bg-blackA-5',
            '',
          )}
          defaultValue={theme || 'dark'}
          onValueChange={(value) => {
            if (value) handleTheme(value)
          }}
          radius="full"
          variant="surface"
        >
          <SegmentedControl.Item suppressHydrationWarning value="dark">
            <MoonIcon />
          </SegmentedControl.Item>
          <SegmentedControl.Item suppressHydrationWarning value="light">
            <SunIcon />
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>
    </Skeleton>
  )
}

export { NavigationButtonClient }
