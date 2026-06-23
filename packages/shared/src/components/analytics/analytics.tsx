import { Suspense } from "react";

import { FathomAnalytics } from "./fathom";
import { VercelAnalytics, VercelSpeedInsights } from "./vercel";

function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
      <Suspense fallback={null}>
        <FathomAnalytics />
      </Suspense>
    </>
  );
}

export { Analytics };
