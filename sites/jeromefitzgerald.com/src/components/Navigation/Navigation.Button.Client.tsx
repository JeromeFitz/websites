'use client'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import * as SegmentedControl from '@radix-ui/themes/dist/esm/components/segmented-control.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

function NavigationButtonClient() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const [isLoading, isLoadingSet] = useState(true)
  // biome-ignore lint/correctness/useExhaustiveDependencies: migrate
  useEffect(() => isLoadingSet(false), [isLoading])

  const handleTheme = (value: any) => {
    setTimeout(() => {
      setTheme(value)
    }, 125)
  }

  return (
    <Skeleton loading={isLoading}>
      <Box
        asChild
        className={cx('z-50 rounded-full backdrop-blur-sm transition-colors')}
        height="100%"
      >
        <SegmentedControl.Root
          className={cx(
            'bg-whiteA-3 hover:bg-whiteA-4 active:bg-whiteA-5',
            'dark:bg-blackA-3 active:dark:bg-blackA-5 hover:dark:bg-blackA-4',
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
