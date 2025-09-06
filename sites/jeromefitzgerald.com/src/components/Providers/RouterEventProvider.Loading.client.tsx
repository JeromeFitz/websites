'use client'

import { useNProgress } from '@tanem/react-nprogress'
import _find from 'lodash/find.js'
import { usePathname } from 'next/navigation.js'
import { useEffect } from 'react'

import { useStore as _useStore, useShallow } from '@/store/index'
import { cx } from '@/utils/cx'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      zzz_menuSecondary: store.zzz_menuSecondary,
      zzz_menuSecondaryActive: store.zzz_menuSecondaryActive,
      zzz_menuSecondaryActiveSet: store.zzz_menuSecondaryActiveSet,
      zzz_menuTertiary: store.zzz_menuTertiary,
      zzz_menuTertiaryActive: store.zzz_menuTertiaryActive,
      zzz_menuTertiaryActiveSet: store.zzz_menuTertiaryActiveSet,
    })),
  )
}

const Loading: React.FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
  const { isFinished } = useNProgress({
    isAnimating: isRouteChanging,
    minimum: 0.08,
  })

  const pathname = usePathname()
  const {
    zzz_menuSecondary,
    zzz_menuSecondaryActiveSet,
    zzz_menuTertiary,
    zzz_menuTertiaryActiveSet,
  } = useStore()

  useEffect(() => {
    isFinished
      ? document.body.classList.remove('loading')
      : document.body.classList.add('loading')

    const pathnameSplit = pathname.split('/')

    let type = pathnameSplit[1]

    if (pathname === '/') type = 'home'
    const mt2 = _find(zzz_menuSecondary, { id: type })
    const hasTertiary = mt2?.hasSubNavigation
    const mt3 = hasTertiary
      ? _find(zzz_menuTertiary[type], { href: pathname })
      : null

    if (mt2) zzz_menuSecondaryActiveSet(mt2)
    if (mt3) zzz_menuTertiaryActiveSet(mt3)

    return () => {
      document.body.classList.remove('loading')
    }
  }, [isFinished])

  return (
    <div
      className={cx(
        'pointer-events-none fixed',
        'z-[9999] origin-[0_0]',
        'left-0 top-0 h-1 w-full',
        'bg-gradient-to-r',
        'to-accent-11 from-accent-1',
        'dark:from-accent-11 dark:to-accent-1',
        isFinished ? 'opacity-0' : 'opacity-100',
        '',
      )}
    />
  )
}

export { Loading }
