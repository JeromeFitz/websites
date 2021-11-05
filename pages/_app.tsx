import '~styles/chrome.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
// import dynamic from 'next/dynamic'
import Head from 'next/head'
import pluralize from 'pluralize'
// import { FC, useEffect } from 'react'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'

import Footer from '~components/Footer'
import Header from '~components/Header'
// // import Navigation from '~components/Notion/Navigation'
import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'
import { IMAGE__FALLBACKS__SHOWS } from '~lib/constants'
import { Container, DesignSystemProvider, Section } from '~styles/system/components'
import { globalCss, darkTheme } from '~styles/system/stitches.config'

// const NavigationMobileWithNoSSR = dynamic(
//   () => import('~components/Layout').then((mod) => mod.NavigationMobile),
//   {
//     ssr: false,
//   }
// )

pluralize.addPluralRule(/cast$/i, 'cast')
pluralize.addPluralRule(/crew$/i, 'crew')
pluralize.addPluralRule(/lineup$/i, 'lineup')
pluralize.addSingularRule(/music$/i, 'music')
pluralize.addSingularRule(/thanks$/i, 'thanks')
// pluralize.addSingularRule(/tags$/i, 'Tags')

// const Noop: FC = ({ children }) => <>{children}</>

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    color: '$hiContrast',
    backgroundColor: '$loContrast',
    fontFamily: '$sans',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',

    '.dark-theme &': {
      backgroundColor: '$mauve1',
    },
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle',
  },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  '::selection': {
    backgroundColor: '$slateA5',
    color: '$slate12',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5': { fontWeight: 700 },

  'html.nprogress-busy': {
    cursor: 'wait',
  },

  '#nprogress': {
    pointerEvents: 'none',
  },

  '#nprogress .bar': {
    backgroundColor: '$colors$gray7',
    position: 'fixed',
    zIndex: '1001',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
  },

  ':root': {
    '--width-1_3': '33.333333%',
    '--width-2_3': '66.666667%',
    '--width-1_4': '25%',
    '--width-2_4': '50%',
    '--width-3_4': '75%',
    '--width-1_5': '20%',
    '--width-2_5': '40%',
    '--width-3_5': '60%',
    '--width-4_5': '80%',
    '--width-1_12': '8.33333333%',
    '--width-2_12': '16.66666667%',
    '--width-3_12': '25%',
    '--width-4_12': '33.33333333%',
    '--width-5_12': '41.66666667%',
    '--width-6_12': '50%',
    '--width-7_12': '58.33333333%',
    '--width-8_12': '66.66666667%',
    '--width-9_12': '75%',
    '--width-10_12': '83.33333333%',
    '--width-11_12': '91.66666667%',
    '--width-full': '100%',
  },
})

function MyApp({ Component, pageProps, router }: AppProps) {
  globalStyles()
  useAnalytics()

  // const Layout = (Component as any).Layout || Noop

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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0,viewport-fit=cover"
          />
        </Head>
        <ManagedUIContext>
          <NotificationProvider>
            {/* <Layout pageProps={pageProps}>
                <NavigationMobileWithNoSSR />
                <Component {...pageProps} key={router.route} />
              </Layout>
              <NProgress /> */}
            <DesignSystemProvider>
              <ThemeProvider
                disableTransitionOnChange
                attribute="class"
                value={{ light: 'light-theme', dark: darkTheme.className }}
                defaultTheme="system"
              >
                <NProgress />
                <Header />
                <Container as="main" size={{ '@initial': 2, '@bp1': 3, '@bp2': 4 }}>
                  <Section>
                    <Component {...pageProps} key={router.route} />
                  </Section>
                </Container>
                <Footer />
              </ThemeProvider>
            </DesignSystemProvider>
          </NotificationProvider>
        </ManagedUIContext>
      </SWRConfig>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  process.env.NODE_ENV === 'test' && console.log(metric)
}

export default MyApp
