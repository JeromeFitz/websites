'use client'
import { useStore as _useStore, useShallow } from '@/store/index'
import { cx } from '@/utils/cx'

const useStore = () => {
  return _useStore(
    useShallow((store: { isOverlay: any }) => ({
      isOverlay: store.isOverlay,
    })),
  )
}

function Overlay() {
  const { isOverlay } = useStore()
  return (
    <div
      className={cx(
        'bg-blackA-3 dark:bg-blackA-6 fixed left-0 top-0 z-50 h-min w-screen',
        'transition-black/50',
        'pointer-events-none opacity-0',
        isOverlay && 'opacity-100',
      )}
      id="overlay"
    />
  )
}

export { Overlay }
