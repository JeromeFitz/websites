/* eslint-disable perfectionist/sort-imports */
import { SkipNavContent, SkipNavLink } from '@jeromefitz/ds/components/SkipNav'
import { cx } from '@jeromefitz/ds/utils/cx'
import { Analytics } from '@jeromefitz/shared/components/Analytics/Analytics'

import { Theme } from '@radix-ui/themes/dist/esm/components/theme.js'
import { Viewport } from 'next'

import { ContainerFooter } from '@/app/playground/2024/_components/Container.Footer'
import { ContainerGradient } from '@/app/playground/2024/_components/Container.Gradient'
import { ContainerContent } from '@/app/playground/2024/_components/Container.Main'
import { ContainerNavigation } from '@/app/playground/2024/_components/Container.Navigation'
import { ContainerSite } from '@/app/playground/2024/_components/Container.Site'
import { Overlay } from '@/app/playground/2024/_components/Overlay'
import { Providers } from '@/components/Providers/index'

import { fonts } from './_next/fonts'
import { PreloadResources } from './_next/preload-resources'

import '@radix-ui/themes/styles.css'

import '@jeromefitz/tailwind-config/styles/globals.css'

// export const metadata = {
//   metadataBase: new URL(`https://${env.NEXT_PUBLIC__SITE}`),
//   manifest: '/images/favicon/site.webmanifest',
//   referrer: 'origin-when-cross-origin',
//   //
//   title: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
//   description:
//     'Jerome Fitzgerald is an an actor, comedian, & writer hailing from Pittsburgh, PA.',
// }

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#030303',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={fonts} lang="en" suppressHydrationWarning={true}>
      <PreloadResources />
      <Theme
        accentColor="pink"
        asChild
        grayColor="mauve"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        <body
          className={cx(
            'overflow-x-hidden overflow-y-auto md:overflow-y-auto',
            'selection:bg-gray-12 selection:text-gray-1',
            'bg-white dark:bg-black',
            'scroll-smooth font-sans antialiased',
            // @hack(radix-ui) dropdown cause mr-45...
            '!m-0',
          )}
        >
          <SkipNavLink />
          <Providers>
            <Analytics />
            <ContainerGradient />
            <ContainerSite>
              <ContainerNavigation />
              <SkipNavContent>
                <ContainerContent>{children}</ContainerContent>
              </SkipNavContent>
              <ContainerFooter />
            </ContainerSite>
            <Overlay />
          </Providers>
        </body>
      </Theme>
    </html>
  )
}
