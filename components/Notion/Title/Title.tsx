import cx from 'clsx'
import { motion } from 'framer-motion'

import Avatar from '~components/Avatar'
import { WEBKIT_BACKGROUND } from '~lib/constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Title = ({ emoji, id, title }) => {
  const xDiff = title.length < 20 ? -500 : -1000

  return (
    <>
      <h1
        className="flex flex-row overflow-x-hidden items-center"
        style={WEBKIT_BACKGROUND}
        key={id}
      >
        <div className="z-10 bg-white dark:bg-black rounded-br-full rounded-tr-full">
          <motion.div
            animate={{ scale: 1 }}
            exit={{ scale: 0.75 }}
            initial={{ scale: 0.75 }}
            transition={{ delay: 0, duration: 0.25 }}
          >
            <Avatar name={title} />
          </motion.div>
        </div>
        <motion.span
          animate={{ x: 0 }}
          className={cx(
            'z-0',
            'text-xl md:text-6xl tracking-tight font-extrabold',
            'bg-clip-text',
            'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
            'dark:bg-gradient-to-l'
          )}
          exit={{ x: xDiff }}
          initial={{ x: xDiff }}
          transition={{ delay: 0, duration: 0.75 }}
          style={{ willChange: 'transform, opacity' }}
        >
          {title}
        </motion.span>
      </h1>
      {/* <div className="spacer--h" /> */}
    </>
  )
}

export default Title
