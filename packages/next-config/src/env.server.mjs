// @ts-check
/**
 * @note(next) until we can do `next.config.ts` this needs to be `mjs`
 *
 * ref: https://github.com/vercel/next.js/pull/63051
 * ref: https://vercel.com/docs/projects/environment-variables/system-environment-variables
 *
 */
import { z } from 'zod'

const REGEX_TEST = /^[\da-f]{64}$/i

// const envSecrets: Array<keyof typeof envSchema.shape> = [
const envSecrets = [
  'DRAFT_TOKEN',
  'GH_TOKEN',
  'LHCI_GITHUB_APP_TOKEN',
  'NOTION_API_KEY',
  'OCTOKIT_TOKEN',
  'OG_API_KEY',
  'PREVIEW_TOKEN',
  'REDIS_URL',
  'REVALIDATE_TOKEN',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REFRESH_TOKEN',
  'UPSTASH_REDIS_REST_TOKEN',
  'UPSTASH_REDIS_REST_URL',
]

const envSchema = z.object({
  DRAFT_TOKEN: z.string().trim().optional(),
  GH_TOKEN: z.string().trim(),
  LHCI_GITHUB_APP_TOKEN: z.string().trim(),
  NOTION__DATABASE__BLOG: z.string().trim(),
  NOTION__DATABASE__BOOKS: z.string().trim(),
  NOTION__DATABASE__EPISODES: z.string().trim(),
  NOTION__DATABASE__EVENTS: z.string().trim(),
  NOTION__DATABASE__PAGES: z.string().trim(),
  NOTION__DATABASE__PEOPLE: z.string().trim(),
  NOTION__DATABASE__PODCASTS: z.string().trim(),
  NOTION__DATABASE__SHOWS: z.string().trim(),
  NOTION__DATABASE__VENUES: z.string().trim(),
  NOTION_API_KEY: z.string().trim(),
  OCTOKIT_TOKEN: z.string().trim().optional(),
  OG_API_KEY: z.string().trim().optional(),
  PREVIEW_TOKEN: z.string().regex(REGEX_TEST).optional(),
  REDIS_URL: z.string().url().optional(),
  REVALIDATE_TOKEN: z.string().regex(REGEX_TEST).optional(),
  SPOTIFY_CLIENT_ID: z.string().trim().optional(),
  SPOTIFY_CLIENT_SECRET: z.string().trim().optional(),
  SPOTIFY_REFRESH_TOKEN: z.string().trim().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
})

const envServerParsed = envSchema.safeParse({
  DRAFT_TOKEN: process.env.DRAFT_TOKEN,
  GH_TOKEN: process.env.GH_TOKEN,
  LHCI_GITHUB_APP_TOKEN: process.env.LHCI_GITHUB_APP_TOKEN,
  NOTION__DATABASE__BLOG: process.env.NOTION__DATABASE__BLOG ?? '',
  NOTION__DATABASE__BOOKS: process.env.NOTION__DATABASE__BOOKS ?? '',
  NOTION__DATABASE__EPISODES: process.env.NOTION__DATABASE__EPISODES ?? '',
  NOTION__DATABASE__EVENTS: process.env.NOTION__DATABASE__EVENTS ?? '',
  NOTION__DATABASE__PAGES: process.env.NOTION__DATABASE__PAGES ?? '',
  NOTION__DATABASE__PEOPLE: process.env.NOTION__DATABASE__PEOPLE ?? '',
  NOTION__DATABASE__PODCASTS: process.env.NOTION__DATABASE__PODCASTS ?? '',
  NOTION__DATABASE__SHOWS: process.env.NOTION__DATABASE__SHOWS ?? '',
  NOTION__DATABASE__VENUES: process.env.NOTION__DATABASE__VENUES ?? '',
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  OCTOKIT_TOKEN: process.env.OCTOKIT_TOKEN,
  OG_API_KEY: process.env.OG_API_KEY,
  PREVIEW_TOKEN: process.env.PREVIEW_TOKEN,
  REDIS_URL: process.env.REDIS_URL,
  REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
})

if (!envServerParsed.success) {
  console.error(
    `- warn [ ⚠️ ] (server) Missing or invalid environment variable${
      envServerParsed.error.errors.length > 1 ? 's' : ''
    }:
${envServerParsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join('\n')}
`,
  )
  process.exit(1)
}

/**
 * @todo(shared) cannot remove these from shared packages 🫠
 */
// for (const envSecretsVar of envSecrets) {
//   delete process.env[envSecretsVar]
// }

const envServerFreeze = Object.freeze(envServerParsed)
const envServer = envServerFreeze.data

// console.dir(`envServer:`)
// console.dir(envServer)

export { envServer }
