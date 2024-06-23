/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

// import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import {
  Item as RadioCardItem,
  Root as RadioCardRoot,
} from '@radix-ui/themes/dist/esm/components/radio-cards.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { useTheme } from 'next-themes'

function FooterThemeClient({ isLoading }) {
  const { setTheme, theme } = useTheme()

  return (
    // @ts-ignore
    <RadioCardRoot
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
        {/* @todo(types) radix */}
        {}
        {/* @ts-ignore */}
        <RadioCardItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('dark')}
          value="dark"
        >
          <MoonIcon />
        </RadioCardItem>
      </Skeleton>
      <Skeleton loading={isLoading}>
        {/* @todo(types) radix */}
        {}
        {/* @ts-ignore */}
        <RadioCardItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('light')}
          value="light"
        >
          <SunIcon />
        </RadioCardItem>
      </Skeleton>
    </RadioCardRoot>
  )
}

export { FooterThemeClient }
