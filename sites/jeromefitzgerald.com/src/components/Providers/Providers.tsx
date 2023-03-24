/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { IMAGE__FALLBACKS__SHOWS } from '@jeromefitz/shared/src/lib/constants'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import pluralize from 'pluralize'
// @ts-ignore
import { createContext, useContext, useEffect, useState } from 'react'
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'
// @ts-ignore
import { createStore, useStore } from 'zustand'

import { ErrorBoundary } from '~components/ErrorBoundary'
import { Loading } from '~components/Loading'
import { pluralRules } from '~config/index'
import { LinkRouterChangeContext } from '~context/LinkRouterChangeContext'
/**
 * @note(next) this needs to be in a client component, not server
 */
pluralRules.map(({ rule, replacement }) => {
  pluralize.addPluralRule(rule, replacement)
})

// @ts-ignore
const store = createStore((set) => ({
  bears: 0,
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
// @ts-ignore
const MyContext = createContext<() => void>(() => {})

function RouterEventWrapper({ children }) {
  const pathname = usePathname()

  const [isRouteChanging, isRouteChangingSet] = useState(false)
  useEffect(() => {
    isRouteChangingSet(false)
  }, [pathname])

  return (
    <>
      <LinkRouterChangeContext.Provider value={() => isRouteChangingSet(true)}>
        <Loading isRouteChanging={isRouteChanging} key={`app-loading-wrapper--0`} />
        {children}
      </LinkRouterChangeContext.Provider>
    </>
  )
}

function Providers({ children }) {
  return (
    <ErrorBoundary>
      {/* <MyContext.Provider value={store}> */}
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange={false}
        value={{ light: 'light', dark: 'dark' }}
        defaultTheme="system"
      >
        <SWRConfig
          value={{
            fallback: { images: IMAGE__FALLBACKS__SHOWS },
            provider: () => new Map(),
          }}
        >
          <RouterEventWrapper>
            <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
          </RouterEventWrapper>
        </SWRConfig>
      </ThemeProvider>
      {/* </MyContext.Provider> */}
    </ErrorBoundary>
  )
}

// const useMyStore = (selector) => useStore(useContext(MyContext), selector)

// export { useMyStore, Providers }
export { Providers }
