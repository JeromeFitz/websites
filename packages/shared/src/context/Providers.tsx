import { darkTheme, ToastProvider } from '@jeromefitz/design-system'
import { ThemeProvider } from 'next-themes'

const Providers = ({ children }) => {
  return (
    <ThemeProvider
      disableTransitionOnChange={false}
      attribute="class"
      value={{ light: 'light-theme', dark: darkTheme.className }}
      defaultTheme="system"
    >
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}

export { Providers }
