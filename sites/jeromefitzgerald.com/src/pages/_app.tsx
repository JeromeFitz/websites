import '@jeromefitz/shared/src/styles/chrome.css'

import {
  globalCss,
  globalStyles as globalStylesDefault,
  Container,
  Section,
} from '@jeromefitz/design-system'
import { ErrorBoundary, NProgress } from '@jeromefitz/shared/src/components'
import { Providers } from '@jeromefitz/shared/src/context/Providers'
import { useAnalytics } from '@jeromefitz/shared/src/lib/analytics'
import { IMAGE__FALLBACKS__SHOWS } from '@jeromefitz/shared/src/lib/constants'
// import { globalStyles as globalStylesShared } from '@jeromefitz/shared/src/styles/globalStyles'
import _merge from 'lodash/merge'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import pluralize from 'pluralize'
import * as React from 'react'
import { SWRConfig } from 'swr'

/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/buildInfo.json'
import { pluralRules } from '~config/index'
import { globalStyles as globalStylesLocal } from '~styles/globalStyles'

const CommandMenu = dynamic(() => import('~components/CommandMenu'), {
  ssr: true,
})
const Header = dynamic(() => import('~components/Header'), {
  ssr: true,
})
const Footer = dynamic(() => import('~components/Footer'), {
  ssr: false,
})

pluralRules.map(({ rule, replacement }) =>
  pluralize.addPluralRule(rule, replacement)
)

const globalStyles = _merge(
  globalStylesDefault,
  // globalStylesShared,
  globalStylesLocal
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
        {/* @todo(react-18) */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
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
              css={{ minHeight: '100vh' }}
              size={{ '@initial': 2, '@bp1': 3, '@bp2': 4 }}
            >
              <Section>
                <Component {...pageProps} key={router.route} />
              </Section>
            </Container>
            <Footer />
            <CommandMenu />
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
