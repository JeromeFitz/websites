// 'use client'

import '~styles/globals.css'
// import '~styles/output.css'

import localFont from 'next/font/local'

// import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'
import { Analytics } from '~components/Analytics'
import { CommandMenu } from '~components/CommandMenu'
import { Footer } from '~components/Footer'
import { Navigation } from '~components/Navigation'
import { NavigationBar } from '~components/NavigationBar'
import { Providers } from '~components/Providers'
import { ScrollToTopHack } from '~components/ScrollToTopHack'
import { metadata as seo } from '~config/metadata'
import { cx } from '~utils/cx'
// import { getNotionData, preload } from '~utils/getNotionData'
// import { log } from '~utils/log'

// const DEBUG_KEY = 'layout.ts >> (root) > '

const fontSans = localFont({
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  src: '../../public/static/fonts/inter/inter-var.woff2',
  // src: '../../public/static/fonts/name-sans/at--name-sans--var-full.woff2',
  style: 'normal',
  variable: '--font-inter',
  weight: '100 900',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = seo

function RootLayout({ children }: RootLayoutProps) {
  // const pathname = usePathname()
  // useEffect(() => {
  //   window.scroll(0, 0)
  // }, [pathname])

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cx(
          'overflow-y-auto overflow-x-hidden',
          'transition-all duration-500',
          'selection:bg-radix-mauve12 selection:text-radix-mauve1',
          'bg-white dark:bg-black',
          'font-sans antialiased',
          fontSans.variable
        )}
      >
        <Analytics />
        <Providers>
          <>
            <Navigation />
            <main className="relative m-0 min-h-screen w-full p-0">
              <NavigationBar />
              <div className="z-10 mx-4 my-6 max-w-screen-sm md:mx-4 md:my-9   md:max-w-screen-lg lg:mx-auto">
                <ScrollToTopHack>{children}</ScrollToTopHack>
              </div>
            </main>
            <Footer />
            <CommandMenu />
          </>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
