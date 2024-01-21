import dynamic from 'next/dynamic'
import pluralize from 'pluralize'
// import { Suspense } from 'react'
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer'

import { ErrorBoundary } from '../ErrorBoundary'

// import { RouterEventProvider } from './RouterEventProvider.client'
import { ThemeProvider } from './ThemeProvider.client'

const RouterEventProvider = dynamic(
  async () => {
    const { RouterEventProvider: Component } = await import(
      './RouterEventProvider.client'
    )
    return { default: Component }
  },
  { ssr: true },
)

const pluralRules = [
  { rule: /cast$/i, replacement: 'cast' },
  { rule: /crew$/i, replacement: 'crew' },
  { rule: /emeritus$/i, replacement: 'emeritus' },
  { rule: /intern$/i, replacement: 'house Staff' },
  { rule: /interns$/i, replacement: 'house Staff' },
  { rule: /lineup$/i, replacement: 'lineup' },
  { rule: /music$/i, replacement: 'musical guests' },
  { rule: /past$/i, replacement: 'emeritus' },
  { rule: /primary$/i, replacement: 'Show' },
  { rule: /supporting$/i, replacement: 'Featuring' },
  { rule: /thanks$/i, replacement: 'thanks' },
  // { rule: /tags$/i, replacement: 'tags' },
]
pluralRules.map(({ rule, replacement }) => {
  pluralize.addPluralRule(rule, replacement)
})
const singularRules = [
  { rule: /intern$/i, replacement: 'house Staff' },
  { rule: /interns$/i, replacement: 'house Staff' },
  { rule: /music$/i, replacement: 'musical guest' },
  { rule: /musical$/i, replacement: 'musical director' },
  { rule: /primary$/i, replacement: 'show' },
  { rule: /supporting$/i, replacement: 'Featuring' },
  { rule: /technical$/i, replacement: 'technical director' },
]
singularRules.map(({ rule, replacement }) => {
  pluralize.addSingularRule(rule, replacement)
})

function Providers({ children }) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange={false}
        enableSystem
        value={{ light: 'light', dark: 'dark' }}
      >
        <RouterEventProvider />
        <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export { Providers }
