import '~styles/chrome.css'

import {
  globalCss,
  darkTheme,
  DesignSystemProvider,
  Container,
  Section,
} from '@modulz/design-system'
import { IdProvider } from '@radix-ui/react-id'
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
// import NProgress from '~components/NProgress'
import { ManagedUIContext } from '~context/ManagedUIContext'
import NotificationProvider from '~context/Notification'
import { useAnalytics } from '~lib/analytics'
import { IMAGE__FALLBACKS__SHOWS } from '~lib/constants'

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
    fontFamily: '$untitled',
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
    backgroundColor: '$violetA5',
    color: '$violet12',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5': { fontWeight: 500 },
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
      <IdProvider>
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
                  <Header />
                  <Container size={{ '@initial': 2, '@bp2': 3 }}>
                    <Section>
                      <Component {...pageProps} key={router.route} />{' '}
                    </Section>
                  </Container>
                  <Footer />
                </ThemeProvider>
              </DesignSystemProvider>
            </NotificationProvider>
          </ManagedUIContext>
        </SWRConfig>
      </IdProvider>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  process.env.NODE_ENV === 'test' && console.log(metric)
}

export default MyApp
