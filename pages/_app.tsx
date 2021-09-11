import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

import { AnimatePresence } from 'framer-motion'
import Inspect from 'inspx'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import pluralize from 'pluralize'
import { FC, useEffect } from 'react'
// import { SWRDevTools } from 'swr-devtools'
// import useSWR, { SWRConfig } from 'swr'

// import ErrorBoundary from '~components/ErrorBoundary'
import { Header } from '~components/Layout'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'

pluralize.addPluralRule(/cast$/i, 'cast')
pluralize.addPluralRule(/crew$/i, 'crew')
pluralize.addSingularRule(/thanks$/i, 'thanks')

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useAnalytics()

  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Inspect disabled={process.env.NODE_ENV === 'production'}>
        {/* <ErrorBoundary> */}
        {/* <SWRConfig value={{ provider: () => new Map() }}> */}
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0,viewport-fit=cover"
          />
        </Head>
        <ManagedUIContext>
          <NotificationProvider>
            <Layout pageProps={pageProps}>
              <Header />
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                {/* <SWRDevTools> */}
                <Component {...pageProps} key={router.route} />
                {/* </SWRDevTools> */}
              </AnimatePresence>
              <NProgress />
            </Layout>
          </NotificationProvider>
        </ManagedUIContext>
        {/* </ErrorBoundary> */}
        {/* </SWRConfig> */}
      </Inspect>
    </>
  )
}
