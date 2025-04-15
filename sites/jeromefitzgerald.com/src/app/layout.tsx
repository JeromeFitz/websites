import type { Metadata } from 'next'

import { Theme } from '@radix-ui/themes/dist/esm/components/theme.js'

import { ContainerFooter } from '@/components/Container/Container.Footer'
import { ContainerGradient } from '@/components/Container/Container.Gradient'
import { ContainerContent } from '@/components/Container/Container.Main'
import { ContainerNavigation } from '@/components/Container/Container.Navigation'
import { ContainerSite } from '@/components/Container/Container.Site'
import { Overlay } from '@/components/Overlay/Overlay'
import { Providers } from '@/components/Providers/Providers'
import { SkipNavContent, SkipNavLink } from '@/components/SkipNav'
// import { getEventsWithLimit } from '@/lib/drizzle/schemas/queries'
import { cx } from '@/utils/cx'

import { fonts } from './_next/fonts'
import { PreloadResources } from './_next/preload-resources'

import '@radix-ui/themes/styles.css'
import './styles--globals.css'

export const metadata: Metadata = {
  authors: [{ name: 'Jerome Fitzgerald', url: 'https://jeromefitzgerald.com' }],
  creator: 'Jerome Fitzgerald',
  description:
    'Jerome Fitzgerald is an actor, comedian, & writer hailing from Pittsburgh, PA.',
  metadataBase: new URL('https://jeromefitzgerald.com'),
  // generator: 'Next.js',
  // keywords: ['Comedy'],
  // publisher: 'Jerome Fitzgerald',
  // referrer: 'origin-when-cross-origin',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  openGraph: {
    images: [
      {
        url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
      },
    ],
  },
  title: {
    default: 'Jerome Fitzgerald (he/him)',
    template: '%s | Jerome',
  },
}

// const links = [
//   { href: `/`, slug: `home` },
//   { href: `/about`, slug: `about` },
//   { href: `/blog`, slug: `blog` },
//   { href: `/books`, slug: `books` },
//   { href: `/colophon`, slug: `colophon` },
//   { href: `/books/tasteful-nudes`, slug: `b: tf` },
//   { href: `/events`, slug: `events` },
//   { href: `/podcasts`, slug: `podcasts` },
//   { href: `/shows`, slug: `shows` },
//   { href: `/venues`, slug: `venues` },
// ]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const events = await getEventsWithLimit({ limit: 3 })
  // console.dir(`events`)
  // console.dir(events)
  return (
    <html lang="en" suppressHydrationWarning={true}>
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
            fonts,
            'antialiased',
            'overflow-y-auto overflow-x-hidden md:overflow-y-auto',
            'selection:bg-gray-12 selection:text-gray-1',
            'bg-white dark:bg-black',
            'scroll-smooth font-sans antialiased',
            // @hack(radix-ui) dropdown cause mr-45...
            '!m-0',
          )}
        >
          <SkipNavLink />
          <Providers>
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
