import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

function VercelAnalytics() {
  return env.IS_VERCEL ? <Analytics debug={env.IS_DEV} /> : null
}

function VercelSpeedInsights() {
  return env.IS_VERCEL ? <SpeedInsights /> : null
}

export { VercelAnalytics, VercelSpeedInsights }
