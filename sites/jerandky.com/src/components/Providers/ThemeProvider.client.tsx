'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import React from 'react'

// https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1364280564

export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />
}
