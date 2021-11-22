// import { BigHead } from '@bigheads/core'
import cx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import _title from 'title'
import { useSound } from 'use-sound'

import PageHeading from '~components/PageHeading'
import Seo from '~components/Seo'
import { useUI } from '~context/ManagedUIContext'
import { useNotification } from '~context/Notification'
import {
  // BIG_HEAD_PROPS,
  MOTION_PAGE_VARIANTS,
  WEBKIT_BACKGROUND,
} from '~lib/constants'
// import rangeMap from '~utils/rangeMap'
import { Box } from '~styles/system/components'

const properties = {
  title: 'Playground',
  seoDescription: 'Sheer Random',
}

const mockTrueFalse = [
  { value: true, title: 'true ' },
  { value: false, title: 'false' },
]

const mockTypes = [
  { description: 'Description of ', value: 'error', title: 'error' },
  { description: 'Description of ', value: 'info', title: 'info' },
  { description: 'Description of ', value: 'success', title: 'error' },
  { description: 'Description of ', value: 'warning', title: 'warning' },
]

const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
    👋
  </motion.div>
)

const Playground = () => {
  const { audio } = useUI()
  // const [loading] = useState(false)
  // const [disabled] = useState(false)

  const { addNotification } = useNotification()
  const [text, textSet] = useState('foo')
  const [type, typeSet] = useState('info')
  const [preserve, preserveSet] = useState(false)

  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const [playOff] = useSound('/static/audio/pop-up-off.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const typeHandleChange = (e) => {
    typeSet(e.target.value)
  }

  const preserveHandleChange = () => {
    preserveSet(!preserve)
  }

  const url = 'https://jeromefitzgerald.com/playground'
  const title = 'Playground'
  const description =
    'This is just a “safe-haven” for Components that are currently being worked on.'

  const seo = {
    title: title,
    description: description,
    canonical: url,
    noindex: true,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <>
      <Seo {...seo} />
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
      <h4>
        Halo <WavingHand />
      </h4>

      <Box
        css={{
          backgroundColor: '$loContrast',
          border: '1px solid $hiContrast',
          borderRadius: '$round',
          height: '8rem',
          width: '8rem',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/static/images/bighead--jerome--dizzy.svg`}
          alt={`bighead--jerome`}
        />
      </Box>
      {/* <BigHead {...BIG_HEAD_PROPS} /> */}

      <motion.div
        key={`page-playground`}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0.25, duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        <h2 style={WEBKIT_BACKGROUND}>{description}</h2>
        <div id="content">
          <h3 className="w-full bg-success text-black dark:text-white rounded pl-2 py-2">
            Notification
          </h3>
          <div className="flex flex-col md:flex-row items-start justify-items-start justify-between mt-4 mb-6 w-full overflow-hidden">
            <div className="flex flex-col md:flex-col">
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="text-base font-medium text-secondary">
                    Preserved
                  </legend>
                  <p className="text-sm text-secondary">
                    Should the notification be preserved until User Action?
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {mockTrueFalse.map((item, itemIdx) => {
                    return (
                      <div
                        className="flex items-center"
                        key={`mockTrueFalse--${itemIdx}`}
                      >
                        <input
                          checked={preserve === item.value}
                          className={cx(
                            'h-4 w-4 ',
                            'border-gray-700 dark:border-gray-300',
                            'text-secondary',
                            'focus:ring-yellow-400'
                          )}
                          id={item.title}
                          name="preserve"
                          onChange={preserveHandleChange}
                          type="radio"
                          value={item.value.toString()}
                        />
                        <label
                          className="ml-3 block text-sm font-medium text-secondary"
                          htmlFor={item.title}
                        >
                          {_title(item.title)}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="text-base font-medium text-secondary">
                    Message
                  </legend>
                  <p className="text-sm text-secondary">
                    Text that should be displayed to User
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="w-full">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Text
                    </label>
                    <input
                      type="text"
                      name="message"
                      id="message"
                      className={cx(
                        `mt-1 p-4 focus:ring-yellow-500 focus:border-yellow-500 block shadow-sm sm:text-sm border border-gray-800 dark:border-gray-300 rounded-md`
                      )}
                      value={text}
                      onChange={(e) => textSet(e.target.value)}
                    />
                  </div>
                  <div className="py-3 text-left sm:px-6">
                    <button
                      className={cx(
                        `inline-flex justify-center py-2 px-4 border border-transparent`,
                        `shadow-sm text-sm font-medium rounded-md`,
                        `dark:text-black dark:bg-white text-white bg-black`,
                        `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`
                      )}
                      onClick={() => {
                        if (text) {
                          addNotification({ preserve, text, type })
                          // setValue('')
                        }
                      }}
                      onMouseDown={() => playActive}
                      onMouseUp={() => {
                        playOff()
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <fieldset className="flex flex-col">
              <div>
                <legend className="text-base font-medium text-secondary">
                  Types
                </legend>
                <p className="text-sm text-secondary">
                  What type of Notification should be shown to User?
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {mockTypes.map((item, itemIdx) => {
                  return (
                    <div className="flex items-start" key={`mockType--${itemIdx}`}>
                      <div className="flex items-center h-5">
                        <input
                          id={item.title}
                          name="types"
                          type="checkbox"
                          className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                          onChange={typeHandleChange}
                          onMouseDown={() => playActive}
                          onMouseUp={() => {
                            type === item.value ? playOff() : playOn()
                          }}
                          checked={type === item.value}
                          value={item.value}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={item.title}
                          className="font-medium text-gray-700 dark:text-gray-200"
                        >
                          {_title(item.title)}
                        </label>
                        <p className="text-gray-500 dark:text-gray-300">
                          {_title(item.description + item.title)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </fieldset>
          </div>
          <div>
            <h1>Tailwind Cheat</h1>
            <p>If these values are here, they will not be purged.</p>
            <p>
              Also... if we are generating dynamic content for Notion, then having
              them “here”pre-renders in a dynamic trick.
            </p>
            <p className={cx('transform rotate-180 rotate-360 duration-500')}>
              <code>transform rotate-180 rotate-360 duration-500</code>
            </p>
            <ol className={cx('list-decimal')}>
              <li>Fart</li>
              <li>Knocker</li>
            </ol>
            <p className={cx('italic')}>Italicized Text</p>
            <label className={cx('flex items-center space-x-3')}>
              <input
                disabled
                type="checkbox"
                className={cx(
                  'h-6 w-6',
                  'form-tick appearance-none border border-gray-300 rounded-md  focus:outline-none',
                  true && 'checked:bg-blue-600 checked:border-transparent'
                )}
                checked={true}
              />
              <span className={cx('text-gray-900 font-medium')}>
                Checked Item (Disabled)
              </span>
            </label>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Playground
