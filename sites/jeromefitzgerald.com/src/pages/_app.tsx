import '~styles/chrome.css'

import { Container, Section } from '@jeromefitz/design-system/components'
import { globalCss } from '@jeromefitz/design-system/stitches.config'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import pluralize from 'pluralize'
import * as React from 'react'
import { SWRConfig } from 'swr'

import { ErrorBoundary } from '~components/ErrorBoundary'
import NProgress from '~components/NProgress'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/buildInfo.json'
import { pluralRules } from '~config/index'
import { Providers } from '~context/Providers'
import { useAnalytics } from '~lib/analytics'
import { IMAGE__FALLBACKS__SHOWS } from '~lib/constants'
import globalStyles from '~styles/global'

const Header = dynamic(() => import('~components/Header'), {
  ssr: true,
})
const Footer = dynamic(() => import('~components/Footer'), {
  ssr: false,
})

pluralRules.map(({ rule, replacement }) =>
  pluralize.addPluralRule(rule, replacement)
)

function MyApp({ Component, pageProps, router }: AppProps) {
  globalCss(globalStyles)()
  useAnalytics()

  React.useEffect(() => {
    document?.body?.classList?.remove('loading')
    const { branch, isBranchMain, prerelease, version } = buildInfo
    const message = [
      ``,
      `[ 👋️ ] Hiya`,
      ``,
      `[ 🏷️ ] v${version}`,
      !isBranchMain ? `[ 🧪️ ] ${!!prerelease ? prerelease : branch}` : ``,
      ` `,
      `[ 🐙️ ] https://github.com/JeromeFitz`,
      `[ 🐦️ ] https://twitter.com/JeromeFitz`,
      ``,
    ]
    message.map((msg) => console.log(msg))
  }, [])

  return (
    <>
      <ErrorBoundary>
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
          <Providers>
            <NProgress />
            <Header />
            <Container
              as="main"
              id="main"
              css={{ height: '100vh' }}
              size={{ '@initial': 2, '@bp1': 3, '@bp2': 4 }}
            >
              <Section>
                <Component {...pageProps} key={router.route} />
              </Section>
            </Container>
            <Footer />
          </Providers>
        </SWRConfig>
      </ErrorBoundary>
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  process.env.NODE_ENV === 'test' && console.log(metric)
}

export default MyApp
