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
    <Skeleton loading={isLoading}>
      <Box
        asChild
        className={cx(
          'z-50 h-full rounded-full backdrop-blur transition-colors',
          // 'bg-whiteA-9 dark:bg-blackA-9',
        )}
      >
        <SegmentedControl.Root
          className={cx(
            'size-full',
            'bg-whiteA-3 hover:bg-whiteA-4 active:bg-whiteA-5',
            'dark:bg-blackA-3 hover:dark:bg-blackA-4 active:dark:bg-blackA-5',
            // 'text-accent-12 hover:text-accent-12 active:text-accent-12',
            '',
          )}
          defaultValue={theme || 'dark'}
          onValueChange={(value) => {
            if (value) handleTheme(value)
          }}
          radius="full"
          variant="surface"
        >
          {/* @todo(types) radix */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
          {/* @ts-ignore */}
          <SegmentedControl.Item
            // aria-label="Dark theme"
            suppressHydrationWarning
            value="dark"
          >
            <MoonIcon />
          </SegmentedControl.Item>
          {/* @todo(types) radix */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment  */}
          {/* @ts-ignore */}
          <SegmentedControl.Item
            // aria-label="Light theme"
            suppressHydrationWarning
            value="light"
          >
            <SunIcon />
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>
    </Skeleton>
    // </Box>
  )
}

export { NavigationButtonClient }
