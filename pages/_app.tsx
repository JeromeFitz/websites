import '~styles/index.css'
// import 'keen-slider/keen-slider.min.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import { getNextSeo as SEO } from '~config/notion/website'
import ToastProvider from '~context/Toast'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'

import { useAnalytics } from '~lib/analytics'

export default function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics()

  return (
    <>
      <ManagedUIContext>
        <ToastProvider>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
          <NProgress />
        </ToastProvider>
      </ManagedUIContext>
    </>
  )
}
