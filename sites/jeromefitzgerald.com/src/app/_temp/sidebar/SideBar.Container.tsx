import { cx } from '@jeromefitz/ds/utils/cx'

import { motion } from 'framer-motion'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

function SideBarContainer({
  children,
  href = '/',
  percentage = 0,
  percentageReveal = 0,
}) {
  const isVisible = percentageReveal <= percentage
  const props = isVisible
    ? {}
    : {
        tabIndex: -1,
      }
  return (
    <NextLink
      // aria-hidden={!isVisible}
      className={cx('no-underline aria-hidden:[pointer-events:none]')}
      href={href}
      {...props}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.96,
        }}
        className={cx(
          'size-full p-4 md:p-2',
          'rounded border border-[var(--accent-10)]',
          'overflow-y-hidden backdrop-blur-md',
          'bg-[var(--whiteA10)] dark:bg-[var(--blackA10)]',
          'md:bg-[var(--whiteA7)] md:dark:bg-[var(--blackA7)]',
          'md:hover:bg-[var(--whiteA10)] md:dark:hover:bg-[var(--blackA10)]',
          'z-[100]',
          'duration-250 transition-all',
          'md:shadow-md md:hover:shadow-lg',
          '',
        )}
        exit={{ opacity: 0, scale: 0.96 }}
        initial={{
          opacity: percentageReveal <= 0 ? 1 : 0,
          scale: percentageReveal <= 0 ? 1 : 0.96,
        }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </NextLink>
  )
}

export { SideBarContainer }
