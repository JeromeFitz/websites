import cx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import _title from 'title'
import { useSound } from 'use-sound'

import { Banner as AlertBanner } from '~components/Alert'
import Layout from '~components/Layout'
import Seo from '~components/Seo'
import { Container, Grid, Skeleton, Button } from '~components/UI'
import { useUI } from '~context/ManagedUIContext'
import { useNotification } from '~context/Notification'
import { MOTION_PAGE_VARIANTS, WEBKIT_BACKGROUND } from '~lib/constants'
import rangeMap from '~utils/rangeMap'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

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

const BackgroundColorMotion = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="h-5/6 w-5/6 mx-0 my-auto p-4">
      <div
        className={cx(
          'transition-all duration-500 bg-gradient-to-tl',
          'from-pink-500 via-red-500 to-yellow-400 ',
          'bg-pos-0 hover:bg-pos-100 bg-size-200',
          // 'hover:bg-gradient-to-tr',
          ''
          //   'relative z-10 duration-500 bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500',
          //   'before:contents before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-1 before:bg-gradient-to-l before:from-pink-600 before:via-red-600 before:to-yellow-600',
          //   'hover:bg-gradient-to-l hover:from-pink-700 hover:via-red-700 hover:to-yellow-700',
          //   'transition-all'
        )}
        // // initial={{ '--rotate': '0deg' } as any}
        // // animate={{ '--rotate': shouldReduceMotion ? '0deg' : '360deg' } as any}
        // // transition={{ duration: 2, repeat: Infinity }}
        // // style={{ transform: 'rotate(var(--rotate))' }}
      >
        <h1>Uh Hello.</h1>
      </div>
      <h1
        className={cx(
          'font-bold text-transparent bg-clip-text bg-gradient-to-l',
          'transition-all duration-500',
          // 'from-green-100 via-green-300 to-green-500',
          'from-green-200 via-green-400 to-purple-700',
          'bg-pos-0 hover:bg-pos-100',
          'bg-size-100 hover:bg-size-175'
        )}
      >
        Uh Goodbye.
      </h1>
      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-t to-white via-black from-red-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>

      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-tl to-white via-black from-red-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>
      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-br to-white via-black from-red-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>
      <br />
      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-t from-red-800 via-red-500 to-red-200 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>
      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-purple-800 via-purple-600 to-purple-400 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>
      <button className="m-2 p-10 text-white rounded-xl transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-400 bg-size-200 bg-pos-0 hover:bg-pos-100">
        Hover me
      </button>
    </div>
  )
}

const Playground = () => {
  const { audio, openModal, setModalView } = useUI()
  const [loading] = useState(false)
  const [disabled] = useState(false)

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

  const handleModalTest = () => {
    setModalView('MODAL_TEST_VIEW')
    openModal()
  }

  /**
   * @error or @loading
   */
  const isLoading = false
  if (isLoading)
    return (
      <>
        <Layout>
          <Breadcrumb isIndex={true} title={'Loading...'} />
        </Layout>
      </>
    )

  return (
    <>
      <Layout>
        <Seo {...seo} />
        {/* <Title emoji={``} id={`fdsajklfads`} title={title} /> */}
        <Breadcrumb isIndex={true} title={title} />
        <h4>
          Halo <WavingHand />
        </h4>
        <BackgroundColorMotion />
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
            <Link href="/playground/event">Event Template</Link>
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={disabled}
              onClick={() => handleModalTest()}
            >
              Modal Test
            </Button>
            <Container>
              <Grid layout="normal">
                {rangeMap(9, (i) => (
                  <Skeleton
                    key={i}
                    className="w-full animated fadeIn"
                    height={9}
                    width={9}
                  />
                ))}
              </Grid>
            </Container>
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
            </div>

            {/* <div>
            <div>
              <div className="bg-error">bg-error</div>
              <div className="bg-error-light">bg-error-light</div>
              <div className="bg-error-lighter">bg-error-lighter</div>
              <div className="bg-error-dark">bg-error-dark</div>
            </div>
            <div>
              <div className="bg-info">bg-info</div>
              <div className="bg-info-light">bg-info-light</div>
              <div className="bg-info-lighter">bg-info-lighter</div>
              <div className="bg-info-dark">bg-info-dark</div>
            </div>
            <div>
              <div className="bg-success">bg-success</div>
              <div className="bg-success-light">bg-success-light</div>
              <div className="bg-success-lighter">bg-success-lighter</div>
              <div className="bg-success-dark">bg-success-dark</div>
            </div>
            <div>
              <div className="bg-warning">bg-warning</div>
              <div className="bg-warning-light">bg-warning-light</div>
              <div className="bg-warning-lighter">bg-warning-lighter</div>
              <div className="bg-warning-dark">bg-warning-dark</div>
            </div>
          </div> */}
          </div>
        </motion.div>
      </Layout>
      {/* <AlertNotification>Notification Test</AlertNotification> */}
      <></>
      <AlertBanner>Notification Test</AlertBanner>
    </>
  )
}

export default Playground
