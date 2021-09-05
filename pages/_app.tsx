import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

import Inspect from 'inspx'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FC, useEffect } from 'react'

import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics()

  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Inspect>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0,viewport-fit=cover"
          />
        </Head>
        <ManagedUIContext>
          <NotificationProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
              <NProgress />
            </Layout>
          </NotificationProvider>
        </ManagedUIContext>
      </Inspect>
    </>
  )
}
