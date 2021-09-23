import { HomeIcon, MenuAlt4Icon, XIcon } from '@heroicons/react/solid'
import { SkipNavContent } from '@reach/skip-nav'
import cx from 'clsx'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useSound } from 'use-sound'

import { Footer } from '~components/Layout'
import { Modal, LoadingDots } from '~components/UI'
import links from '~config/navigation'
import { useUI } from '~context/ManagedUIContext'

const Loading = () => (
  <div className="flex items-center text-center justify-center p-3 w-24 h-24">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />,
}

const ModalTest = dynamic(
  () => import('~components/UI/Modal/ModalTest'),
  dynamicProps
)

const Layout: FC<any> = ({ children }) => {
  const {
    // displaySidebar,
    displayModal,
    // closeSidebar,
    closeModal,
    modalView,
  } = useUI()

  return (
    <>
      <NavigationMobile />
      <main
        className={cx(
          'flex flex-col min-h-screen'
          // 'px-4 md:px-8',
          // 'bg-gradient-to-t from-gray-200 dark:from-gray-900'
        )}
      >
        <article
          className={cx(
            'flex flex-col w-full max-w-4xl',
            // 'px-2 py-4 my-0 mx-auto',
            // 'md:px-8 md:py-4',
            `px-2 mx-auto md:px-8`,
            ``
          )}
        >
          <SkipNavContent />
          {children}
        </article>
        {/* <CTA /> */}
      </main>
      <Footer />
      <Modal open={displayModal} onClose={closeModal}>
        {modalView === 'MODAL_TEST_VIEW' && <ModalTest />}
      </Modal>
    </>
  )
}

const NavigationMobile = () => {
  const router = useRouter()
  const { audio, displayNavigation, closeNavigation, toggleNavigation } = useUI()
  // const [soundMenuOpen] = useSound('/static/audio/menu-open.mp3', {
  //   soundEnabled: audio,
  //   volume: 0.5,
  // })
  const [soundSwitchOff] = useSound('/static/audio/switch-off.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const [soundSwitchOn] = useSound('/static/audio/switch-on.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })

  const handleClick = () => {
    displayNavigation ? soundSwitchOff() : soundSwitchOn()
    toggleNavigation()
  }
  const handleClickHome = () => {
    closeNavigation()
    soundSwitchOff()
    void router.push('/')
  }
  const handleClickLink = () => {
    soundSwitchOff()
    closeNavigation()
  }

  return (
    <>
      <div className={cx('menu--mobile z-50', 'fixed bottom-3 right-4', '')}>
        <motion.button
          className={cx(
            `badge`,
            'focus:ring-4',
            `bg-black text-white`,
            `dark:bg-white dark:text-black`,
            'text-lg',
            ''
          )}
          onClick={() => handleClick()}
          initial={{ scale: 0.8, y: 0 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          {displayNavigation ? (
            <XIcon className={cx('h-5 w-5 md:h10 md:w-10')} />
          ) : (
            <MenuAlt4Icon className={cx('h-5 w-5 md:h10 md:w-10')} />
          )}
        </motion.button>
        <motion.nav className=" absolute top-0 w-full">
          <motion.ul
            className={cx(
              'fixed flex flex-col-reverse items-end w-full',
              'm-0 p-0 list-none',
              'bottom-16 md:bottom-20 right-4',
              displayNavigation ? 'flex' : 'hidden',
              ''
            )}
            // initial={{ scale: 0.8, y: -1000, opacity: 0 }}
            // animate={{ scale: 1, y: 0, opacity: displayNavigation ? 1 : 0 }}
            // exit={{ scale: 0.8, y: -1000, opacity: 0 }}
            // transition={{ duration: 0.125 }}
          >
            {links.map((link, linkIndex) => {
              if (!link.active) {
                return null
              }

              const delay = [
                'delay-75',
                'delay-100',
                'delay-150',
                'delay-200',
                'delay-300',
                'delay-500',
                'delay-700',
                'delay-1000',
              ]

              return (
                <motion.li
                  className={cx('my-0.5 cursor-pointer', delay[linkIndex])}
                  key={`link--${link.title}`}
                  initial={{ scale: 0.8, y: 0 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleClickLink()}
                >
                  <NextLink href={link.href}>
                    <a
                      className={cx(
                        `badge-sm`,
                        'bg-black dark:bg-white text-white dark:text-black',
                        // 'text-lg font-bold',
                        'capitalize'
                      )}
                    >
                      {link.title}
                    </a>
                  </NextLink>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.nav>
      </div>
      {router.asPath === '/' ? null : (
        <div className={cx('menu--home z-50', 'fixed bottom-3 left-4', '')}>
          <motion.button
            className={cx(
              `badge`,
              'focus:ring-4',
              `bg-black text-white`,
              `dark:bg-white dark:text-black`,
              'text-lg',
              ''
            )}
            onClick={() => handleClickHome()}
            initial={{ scale: 0.8, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <HomeIcon className={cx('h-5 w-5 md:h10 md:w-10')} />
          </motion.button>
        </div>
      )}
    </>
  )
}

export default Layout
