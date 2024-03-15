/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

// import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import {
  Item as RadioCardGroupItem,
  Root as RadioCardGroupRoot,
} from '@radix-ui/themes/dist/esm/components/radio-card-group.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { useTheme } from 'next-themes'

function FooterThemeClient({ isLoading }) {
  const { setTheme, theme } = useTheme()

  return (
    // @ts-ignore
    <RadioCardGroupRoot
      className={cx(
        '[--accent-indicator:var(--pink-6)]',
        '![--grid-template-columns:repeat(2,_minmax(0,_1fr))]',
      )}
      defaultValue={theme}
      gap="1"
      highContrast={false}
      size="1"
    >
      <Skeleton loading={isLoading}>
        <RadioCardGroupItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('dark')}
          value="dark"
        >
          <MoonIcon />
        </RadioCardGroupItem>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <RadioCardGroupItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('light')}
          value="light"
        >
          <SunIcon />
        </RadioCardGroupItem>
      </Skeleton>
    </RadioCardGroupRoot>
  )
}

export { FooterThemeClient }
