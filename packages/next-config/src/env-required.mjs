/**
 * @note The following environment variables are required
 */
const items = [
  'GH_TOKEN',
  'LHCI_GITHUB_APP_TOKEN',
  'NEXT_PUBLIC__FATHOM_SITE_ID',
  'NEXT_PUBLIC__SITE',
  'NOTION__DATABASE__BLOG',
  'NOTION__DATABASE__BOOKS',
  'NOTION__DATABASE__EPISODES',
  'NOTION__DATABASE__EVENTS',
  'NOTION__DATABASE__PAGES',
  'NOTION__DATABASE__PEOPLE',
  'NOTION__DATABASE__PODCASTS',
  'NOTION__DATABASE__SHOWS',
  'NOTION__DATABASE__VENUES',
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

export default envRequired
