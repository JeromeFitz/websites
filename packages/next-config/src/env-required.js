/**
 * @note The following environment variables are required
 */
const items = [
  'GH_TOKEN',
  'LHCI_GITHUB_APP_TOKEN',
  'NEXT_PUBLIC__EVENT_UPCOMING_FLAG',
  'NEXT_PUBLIC__FATHOM_CUSTOM_DOMAIN',
  'NEXT_PUBLIC__FATHOM_SITE_ID',
  'NEXT_PUBLIC__SITE',
  'NOTION_API_KEY',
  'OCTOKIT_TOKEN',
  'OG_API_KEY',
  'PREVIEW_TOKEN',
  'REDIS_URL',
  'REVALIDATE_TOKEN',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REFRESH_TOKEN',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
]

function envRequired() {
  items.map((item) => {
    if (!process.env[item]) {
      throw new Error(`process.env.${item} is not set in env`)
    }
  })
}

module.exports = envRequired
