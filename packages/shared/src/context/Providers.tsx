import { KBarProvider, ToastProvider } from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { ThemeProvider } from 'next-themes'

import { MediaContextProvider } from './Media'

const Providers = ({ children }) => {
  return (
    <MediaContextProvider>
      <ThemeProvider
        disableTransitionOnChange={false}
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.className }}
        defaultTheme="system"
      >
        <ToastProvider>
          <KBarProvider>{children}</KBarProvider>
        </ToastProvider>
      </ThemeProvider>
    </MediaContextProvider>
  )
}

export { Providers }
