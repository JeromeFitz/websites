'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    isOverlay: store.isOverlay,
  }))
}

function Overlay() {
  const { isOverlay } = useStore()
  return (
    <div
      className={cx(
        'bg-blackA-3 dark:bg-blackA-6 fixed left-0 top-0 z-50 h-screen w-screen',
        'transition-opacity',
        'pointer-events-none opacity-0',
        isOverlay && 'opacity-100',
      )}
      id="overlay"
    />
  )
}

export { Overlay }
