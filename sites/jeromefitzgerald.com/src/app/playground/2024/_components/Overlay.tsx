'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useStore as _useStore, useShallow } from '@/store/index'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      isOverlay: store.isOverlay,
    })),
  )
}

function Overlay() {
  const { isOverlay } = useStore()
  return (
    <div
      className={cx(
        'bg-blackA-3 dark:bg-blackA-6 fixed top-0 left-0 z-50 h-screen w-screen',
        'transition-black/50',
        'pointer-events-none opacity-0',
        isOverlay && 'opacity-100',
      )}
      id="overlay"
    />
  )
}

export { Overlay }
