import React, { FC } from 'react'
import cx from 'clsx'
import dynamic from 'next/dynamic'

import { Modal, LoadingDots } from '~components/UI'
import { Footer, Navigation } from '~components/Layout'
// import CTA from '~components/CTA'

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
      <Navigation />
      <main
        className={cx(
          'flex flex-col min-h-screen',
          // 'px-4 md:px-8',
          'bg-gradient-to-t from-gray-200 dark:from-gray-900'
        )}
      >
        <article
          className={cx(
            'flex flex-col w-full max-w-4xl',
            'px-2 py-8 md:px-8 my-0 md:my-8 mx-auto'
          )}
        >
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

export default Layout
