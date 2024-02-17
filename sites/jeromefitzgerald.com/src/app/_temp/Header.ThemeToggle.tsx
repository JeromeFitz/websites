'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { IconButton } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const themes = [
  { active: true, icon: MoonIcon, id: 'dark' },
  { active: true, icon: SunIcon, id: 'light' },
]

function Theme({ theme }) {
  const { resolvedTheme, setTheme } = useTheme()
  const Icon = theme.icon

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <IconButton
      // className={cx('!bg-[var(--accent-a5)] !ml-1')}
      className={cx(
        (mounted && resolvedTheme === theme.id) || resolvedTheme === 'system'
          ? '!bg-[var(--accent-a5)]'
          : '!bg-[var(--accent-a2)]',
        mounted ? '' : '!bg-[var(--accent-a3)]',
        '!duration-250 !ml-1 !transition-colors',
        '!cursor-pointer',
      )}
      color="pink"
      key={`icon-${theme.id}`}
      onClick={() => setTheme(theme.id)}
      radius="full"
      size="3"
      variant="ghost"
    >
      <Icon />
    </IconButton>
  )
}

function ThemeToggle({}) {
  return (
    <div className="flex items-center gap-2">
      {themes.map((theme) => (
        <Theme key={theme.id} theme={theme} />
      ))}
    </div>
  )
}

export { ThemeToggle }
