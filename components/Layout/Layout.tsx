import cx from 'clsx'

import { Footer, Navigation } from '~components/Layout'
// import CTA from '~components/CTA'

const Layout = ({ children }) => {
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
    </>
  )
}

export default Layout
