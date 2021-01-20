import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'
import '~styles/chrome.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { getNextSeo as SEO } from '~config/notion/website'
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
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ManagedUIContext>
        <ToastProvider>
          <Layout pageProps={pageProps}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <NProgress />
          </Layout>
        </ToastProvider>
      </ManagedUIContext>
    </>
  )
}
