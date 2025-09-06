import type { Metadata } from 'next'

import type { Event } from '@/lib/drizzle/schemas/types'

import { Theme } from '@radix-ui/themes/dist/esm/components/theme.js'
import { isAfter } from 'date-fns/isAfter'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _take from 'lodash/take.js'

import { ContainerFooter } from '@/components/Container/Container.Footer'
import { ContainerGradient } from '@/components/Container/Container.Gradient'
import { ContainerContent } from '@/components/Container/Container.Main'
import { ContainerNavigation } from '@/components/Container/Container.Navigation'
import { ContainerSite } from '@/components/Container/Container.Site'
import { Overlay } from '@/components/Overlay/Overlay'
import { Providers } from '@/components/Providers/Providers'
import { StoreInitEventsUpcoming } from '@/components/Providers/StoreInitEventsUpcoming.client'
import { SkipNavContent, SkipNavLink } from '@/components/SkipNav'
import { getEventsWithLimit } from '@/lib/drizzle/schemas/queries'
import { cx } from '@/utils/cx'

import { fonts } from './_next/fonts'
import { PreloadResources } from './_next/preload-resources'

import '@radix-ui/themes/styles.css'
import './styles--globals.css'

export const metadata: Metadata = {
  authors: [{ name: 'Jerome Fitzgerald', url: 'https://jeromefitzgerald.com' }],
  creator: 'Jerome Fitzgerald',
  description:
    'Jerome Fitzgerald is an actor, comedian, & writer in Brooklyn, NY. Hailing from Pittsburgh, PA.',
  metadataBase: new URL('https://jeromefitzgerald.com'),
  openGraph: {
    images: [
      {
        url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
      },
    ],
  },
  title: {
    default: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
    template: '%s | Jerome (he/him)',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  async function getEventsUpcoming() {
    'use server'
    const dateNow = Date.now()
    const items = await getEventsWithLimit({ limit: 10 })
    return _take(
      _orderBy(
        _filter(items, (event: Event) => !isAfter(dateNow, event.dateIso)),
        (event: Event) => [event.dateIso],
        ['asc'],
      ),
      3,
    )
  }
  const events = await getEventsUpcoming()

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
            <StoreInitEventsUpcoming items={events} />
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
