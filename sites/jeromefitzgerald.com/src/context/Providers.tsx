import {
  KBarProvider,
  ToastProvider,
  Toaster,
} from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { ThemeProvider } from 'next-themes'

import { KBarPortal } from '~components/KBar'
import { MediaContextProvider } from '~context/Media'
import { ManagedUIContext } from '~context/UI'

const Providers = ({ children }) => {
  return (
    <MediaContextProvider>
      <ManagedUIContext>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          value={{ light: 'light-theme', dark: darkTheme.className }}
          defaultTheme="system"
        >
          <ToastProvider>
            <KBarProvider>
              {children}
              <KBarPortal />
              <Toaster />
            </KBarProvider>
          </ToastProvider>
        </ThemeProvider>
      </ManagedUIContext>
    </MediaContextProvider>
  )
}

export { Providers }
