import '~styles/global.css'
// import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import Head from '~components/Head'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import { useAnalytics } from '~lib/analytics'
import SEO from '~config/next-seo.config'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics()

  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <DefaultSeo {...SEO} />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
          <NProgress />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
