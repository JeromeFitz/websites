import cx from 'clsx'
import { motion } from 'framer-motion'

const CardWithGlow = ({ children }) => {
  const cardVariants = {
    // hover: {
    //   scale: 1.05,
    // },
    // initial: {
    //   scale: 1,
    // },
  }

  const glowVariants = {
    // hover: {
    //   opacity: 0.8,
    // },
    // initial: {
    //   scale: 1.05,
    //   opacity: 0,
    // },
  }

  return (
    <motion.div
      className={cx(
        'relative'
        // 'overflow-hidden relative',
        // 'w-2/4 h-3/4'
      )}
      // initial="initial"
      // whileHover="hover"
      initial="hover"
      whileHover="initial"
    >
      <motion.div
        className={cx(
          'absolute top-0 left-0 w-full h-full blur-lg rounded-xl',
          // 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
          'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
        )}
        variants={glowVariants}
        transition={{
          ease: 'easeOut',
          delay: 0.15,
        }}
      />
      <motion.div
        className={cx(
          ' relative',
          'h-full',
          // 'mb-0 px-10 py-10',
          'rounded-xl',
          'bg-white'
          // 'backdrop-opacity-75',
          // 'hover:opacity-95'
        )}
        variants={cardVariants}
        transition={{
          ease: 'easeOut',
          delay: 0.15,
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
export default CardWithGlow
