import dynamic from "next/dynamic";
import { addPluralRule, addSingularRule } from "pluralize";
// import { Suspense } from 'react'
import { Provider as ReactWrapBalancerProvider } from "react-wrap-balancer";

import { Analytics } from "@/components/analytics/analytics";
import { ErrorBoundary } from "@/components/error-boundary";

import { Providers as ProvidersClient } from "./providers.client";
// import { RouterEventProvider } from './router-event-provider.client'
import { StoreProvider } from "./store-provider.client";
import { ThemeProvider } from "./theme-provider.client";

const RouterEventProvider = dynamic(
  async () => {
    const { RouterEventProvider: Component } = await import("./router-event-provider.client");
    return { default: Component };
  },
  { ssr: true },
);

const pluralRules = [
  { replacement: "cast", rule: /cast$/i },
  { replacement: "crew", rule: /crew$/i },
  { replacement: "emeritus", rule: /emeritus$/i },
  { replacement: "house Staff", rule: /intern$/i },
  { replacement: "house Staff", rule: /interns$/i },
  { replacement: "lineup", rule: /lineup$/i },
  { replacement: "musical guests", rule: /music$/i },
  { replacement: "emeritus", rule: /past$/i },
  { replacement: "Show", rule: /primary$/i },
  { replacement: "Featuring", rule: /supporting$/i },
  { replacement: "thanks", rule: /thanks$/i },
  // { rule: /tags$/i, replacement: 'tags' },
];
pluralRules.map(({ replacement, rule }) => {
  addPluralRule(rule, replacement);
});
const singularRules = [
  { replacement: "house Staff", rule: /intern$/i },
  { replacement: "house Staff", rule: /interns$/i },
  { replacement: "musical guest", rule: /music$/i },
  { replacement: "musical director", rule: /musical$/i },
  { replacement: "show", rule: /primary$/i },
  { replacement: "Featuring", rule: /supporting$/i },
  { replacement: "technical director", rule: /technical$/i },
];
singularRules.map(({ replacement, rule }) => {
  addSingularRule(rule, replacement);
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      <ErrorBoundary>
        <ThemeProvider>
          <StoreProvider>
            <RouterEventProvider />
            <ReactWrapBalancerProvider>
              <ProvidersClient>{children}</ProvidersClient>
            </ReactWrapBalancerProvider>
          </StoreProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}

export { Providers };
