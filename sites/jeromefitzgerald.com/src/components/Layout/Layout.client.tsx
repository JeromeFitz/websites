'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { motion } from 'framer-motion'

import { useStore as _useStore } from '~store/index'

const useStore = () => {
  return _useStore((store) => ({
    isWidgetOpen: store.isWidgetOpen,
    isWidgetOpenSet: store.isWidgetOpenSet,
  }))
}

function LayoutClient() {
  const { isWidgetOpen, isWidgetOpenSet } = useStore()

  return (
    <>
      <motion.div
        animate={isWidgetOpen ? 'open' : 'closed'}
        className={cx(
          'z-[49]',
          'bg-[var(--whiteA12)] dark:bg-[var(--blackA12)]',
          'fixed left-0 top-0 h-screen w-full',
          'pointer-events-none data-[open=true]:pointer-events-auto',
          'backdrop-blur-sm',
        )}
        data-open={isWidgetOpen}
        id="widget-blur"
        initial={{ opacity: 0 }}
        onClick={() => {
          isWidgetOpenSet((isWidgetOpen) => !isWidgetOpen)
          if (!isWidgetOpen) {
            document.body.classList.add('!overflow-hidden')
          } else {
            document.body.classList.remove('!overflow-hidden')
          }
        }}
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
      />
    </>
  )
}

export { LayoutClient }
