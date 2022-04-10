import { KBarProvider, ToastProvider } from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { ThemeProvider } from 'next-themes'

const Providers = ({ children }) => {
  return (
    <ThemeProvider
      disableTransitionOnChange={false}
      attribute="class"
      value={{ light: 'light-theme', dark: darkTheme.className }}
      defaultTheme="system"
    >
      <ToastProvider>
        {/* @todo(react-18) */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <KBarProvider>{children}</KBarProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export { Providers }
