import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

// import { AnimatePresence } from 'framer-motion'
import { AnimateSharedLayout } from 'framer-motion'
import Inspect from 'inspx'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import pluralize from 'pluralize'
import { FC, useEffect } from 'react'
import { SWRConfig } from 'swr'

// import { Header } from '~components/Layout'
import Navigation from '~components/Notion/Navigation'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'

pluralize.addPluralRule(/cast$/i, 'cast')
pluralize.addPluralRule(/crew$/i, 'crew')
pluralize.addPluralRule(/lineup$/i, 'lineup')
pluralize.addSingularRule(/music$/i, 'music')
pluralize.addSingularRule(/thanks$/i, 'thanks')
// pluralize.addSingularRule(/tags$/i, 'Tags')

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useAnalytics()

  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Inspect disabled={process.env.NODE_ENV === 'production'}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0,viewport-fit=cover"
            />
          </Head>
          <ManagedUIContext>
            <NotificationProvider>
              <Layout pageProps={pageProps}>
                {/* <Header /> */}
                <Navigation />
                {/* <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              > */}
                <AnimateSharedLayout type="crossfade">
                  <Component {...pageProps} key={router.route} />
                </AnimateSharedLayout>
                <NProgress />
              </Layout>
            </NotificationProvider>
          </ManagedUIContext>
        </Inspect>
      </SWRConfig>
    </>
  )
}
