import { SkipNavContent } from '@reach/skip-nav'
import cx from 'clsx'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

// import { Footer } from '~components/Layout'
import { Modal, LoadingDots } from '~components/UI'
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

const FooterWithNoSSR = dynamic(
  () => import('~components/Layout').then((mod) => mod.Footer),
  {
    ssr: false,
  }
)

const NavigationMobileWithNoSSR = dynamic(
  () => import('~components/Layout').then((mod) => mod.NavigationMobile),
  {
    ssr: false,
  }
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
      <NavigationMobileWithNoSSR />
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
      <FooterWithNoSSR />
      {!!displayModal && (
        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'MODAL_TEST_VIEW' && <ModalTest />}
        </Modal>
      )}
    </>
  )
}

export default Layout
