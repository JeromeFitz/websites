import { Theme } from "@radix-ui/themes";
import { isAfter } from "date-fns/isAfter";
import { filter as _filter, orderBy as _orderBy, take as _take } from "lodash-es";
import type { Metadata } from "next";

import { ContainerFooter } from "@/components/container/container.footer";
import { ContainerGradient } from "@/components/container/container.gradient";
// import { ContainerContent } from '@/components/container/container.main'
import { ContainerNavigation } from "@/components/container/container.navigation";
import { ContainerSite } from "@/components/container/container.site";
import { Overlay } from "@/components/overlay/overlay";
import { Providers } from "@/components/providers/providers";
import { StoreInitEventsUpcoming } from "@/components/providers/store-init-events-upcoming.client";
import { SkipNavContent, SkipNavLink } from "@/components/skip-nav";
import { getEventsWithLimit } from "@/lib/drizzle/schemas/queries";
import type { Event } from "@/lib/drizzle/schemas/types";
import { cx } from "@/utils/cx";

import { fonts } from "./_next/fonts";
import { PreloadResources } from "./_next/preload-resources";
// import { KitchenSink } from './_v16/kitchen-sink'

import "./styles--globals.css";

export const metadata: Metadata = {
  authors: [{ name: "Jerome Fitzgerald", url: "https://jeromefitzgerald.com" }],
  creator: "Jerome Fitzgerald",
  description:
    "Jerome Fitzgerald is an actor, comedian, & writer in NYC. Hailing from Pittsburgh, PA.",
  metadataBase: new URL("https://jeromefitzgerald.com"),
  openGraph: {
    images: [
      {
        url: "https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg",
      },
    ],
  },
  title: {
    default: "Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.",
    template: "%s | Jerome (he/him)",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  async function getEventsUpcoming() {
    "use server";
    const dateNow = Date.now();
    const items = await getEventsWithLimit({ limit: 10 });
    return _take(
      _orderBy(
        _filter(items, (event: Event) => !isAfter(dateNow, event.dateIso)),
        (event: Event) => [event.dateIso],
        ["asc"],
      ),
      3,
    );
  }
  const events = await getEventsUpcoming();

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
            "antialiased",
            "overflow-x-hidden overflow-y-auto md:overflow-y-auto",
            "selection:bg-gray-12 selection:text-gray-1",
            "bg-white dark:bg-black",
            "scroll-smooth font-sans antialiased",
            // @hack(radix-ui) dropdown cause mr-45...
            "!m-0",
          )}
        >
          <SkipNavLink />
          <Providers>
            <StoreInitEventsUpcoming items={events} />
            <ContainerGradient />
            <ContainerSite>
              <ContainerNavigation />
              <SkipNavContent>
                {/* <ContainerContent>{children}</ContainerContent> */}
                {children}
              </SkipNavContent>
              <ContainerFooter />
            </ContainerSite>
            <Overlay />
          </Providers>
        </body>
      </Theme>
    </html>
  );
}

export async function RootLayoutV16({ children }: { children: React.ReactNode }) {
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
            "antialiased",
            "overflow-x-hidden overflow-y-auto md:overflow-y-auto",
            "scroll-smooth font-sans antialiased",
            //
            "selection:bg-gray-12 selection:text-gray-1",
            "bg-white dark:bg-black",
          )}
        >
          <Providers>
            <ContainerGradient />
            {/* <KitchenSink /> */}
            {children}
            <Overlay />
          </Providers>
        </body>
      </Theme>
    </html>
  );
}
