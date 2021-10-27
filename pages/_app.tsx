import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

// // import { AnimatePresence } from 'framer-motion'
// import Inspect from 'inspx'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import pluralize from 'pluralize'
import { FC, useEffect } from 'react'
import { SWRConfig } from 'swr'

// import Navigation from '~components/Notion/Navigation'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'
import { IMAGE__FALLBACKS__SHOWS } from '~lib/constants'

const NavigationMobileWithNoSSR = dynamic(
  () => import('~components/Layout').then((mod) => mod.NavigationMobile),
  {
    ssr: false,
  }
)

pluralize.addPluralRule(/cast$/i, 'cast')
pluralize.addPluralRule(/crew$/i, 'crew')
pluralize.addPluralRule(/lineup$/i, 'lineup')
pluralize.addSingularRule(/music$/i, 'music')
pluralize.addSingularRule(/thanks$/i, 'thanks')
// pluralize.addSingularRule(/tags$/i, 'Tags')

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps, router }: AppProps) {
  useAnalytics()

  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <SWRConfig
        value={{
          fallback: { images: IMAGE__FALLBACKS__SHOWS },
          provider: () => new Map(),
        }}
      >
        {/* <Inspect disabled={process.env.NODE_ENV === 'production'}> */}
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0,viewport-fit=cover"
          />
        </Head>
        <ManagedUIContext>
          <NotificationProvider>
            <Layout pageProps={pageProps}>
              <NavigationMobileWithNoSSR />
              <Component {...pageProps} key={router.route} />
            </Layout>
            <NProgress />
          </NotificationProvider>
        </ManagedUIContext>
        {/* </Inspect> */}
      </SWRConfig>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  process.env.NODE_ENV === 'test' && console.log(metric)
}

export default MyApp
