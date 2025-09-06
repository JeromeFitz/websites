'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1364280564
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange={true}
      enableSystem
      value={{ dark: 'dark', light: 'light' }}
    >
      {children}
    </NextThemesProvider>
  )
}
