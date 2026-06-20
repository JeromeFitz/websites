import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { envClient as env } from 'next-config/env.client'

function VercelAnalytics() {
  return env.IS_VERCEL ? <Analytics debug={env.IS_DEV} /> : null
}

function VercelSpeedInsights() {
  return env.IS_VERCEL ? <SpeedInsights /> : null
}

export { VercelAnalytics, VercelSpeedInsights }
