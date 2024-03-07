import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const debug = process.env.NODE_ENV === 'development'
const isVercel = process.env.VERCEL_URL || ''

function VercelAnalytics() {
  return isVercel ? <Analytics debug={debug} /> : null
}

function VercelSpeedInsights() {
  return isVercel ? <SpeedInsights /> : null
}

export { VercelAnalytics, VercelSpeedInsights }
