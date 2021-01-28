import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import ToastProvider from '~context/Toast'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'

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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,viewport-fit=cover"
        />
      </Head>
      <ManagedUIContext>
        <ToastProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
            <NProgress />
          </Layout>
        </ToastProvider>
      </ManagedUIContext>
    </>
  )
}
