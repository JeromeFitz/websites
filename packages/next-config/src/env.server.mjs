// @ts-check
/**
 * @note(next) until we can do `next.config.ts` this needs to be `mjs`
 *
 * ref: https://github.com/vercel/next.js/pull/63051
 * ref: https://vercel.com/docs/projects/environment-variables/system-environment-variables
 *
 */
import { z } from 'zod'

const envSchema = z.object({
  APPLE_API: z.string().trim(),
  APPLE_AUTH_ISS: z.string().trim(),
  APPLE_AUTH_KID: z.string().trim(),
  APPLE_IDENTIFIER: z.string().trim(),
  APPLE_TOKEN_DEVELOPER: z.string().trim(),
  APPLE_TOKEN_USER: z.string().trim(),
  GOODREADS_ID: z.string().trim(),
  GOODREADS_KEY: z.string().trim(),
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
  POSTGRES_SITE_ID: z.coerce.number().min(1),
  POSTGRES_URL: z.string().trim(),
  PREVIEW_TOKEN: z.string().trim(),
  REDIS_URL: z.string().trim(),
  REVALIDATE_TOKEN: z.string().trim(),
  SPOTIFY_CLIENT_ID: z.string().trim(),
  SPOTIFY_CLIENT_SECRET: z.string().trim(),
  SPOTIFY_REFRESH_TOKEN: z.string().trim(),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim(),
  UPSTASH_REDIS_REST_URL: z.string().trim(),
})

const envServerParsed = envSchema.safeParse({
  APPLE_API: process.env.APPLE_API ?? '',
  APPLE_AUTH_ISS: process.env.APPLE_AUTH_ISS ?? '',
  APPLE_AUTH_KID: process.env.APPLE_AUTH_KID ?? '',
  APPLE_IDENTIFIER: process.env.APPLE_IDENTIFIER ?? '',
  APPLE_TOKEN_DEVELOPER: process.env.APPLE_TOKEN_DEVELOPER ?? '',
  APPLE_TOKEN_USER: process.env.APPLE_TOKEN_USER ?? '',
  GOODREADS_ID: process.env.GOODREADS_ID ?? '',
  GOODREADS_KEY: process.env.GOODREADS_KEY ?? '',
  NOTION__DATABASE__BLOG: process.env.NOTION__DATABASE__BLOG ?? '',
  NOTION__DATABASE__BOOKS: process.env.NOTION__DATABASE__BOOKS ?? '',
  NOTION__DATABASE__EPISODES: process.env.NOTION__DATABASE__EPISODES ?? '',
  NOTION__DATABASE__EVENTS: process.env.NOTION__DATABASE__EVENTS ?? '',
  NOTION__DATABASE__PAGES: process.env.NOTION__DATABASE__PAGES ?? '',
  NOTION__DATABASE__PEOPLE: process.env.NOTION__DATABASE__PEOPLE ?? '',
  NOTION__DATABASE__PODCASTS: process.env.NOTION__DATABASE__PODCASTS ?? '',
  NOTION__DATABASE__SHOWS: process.env.NOTION__DATABASE__SHOWS ?? '',
  NOTION__DATABASE__VENUES: process.env.NOTION__DATABASE__VENUES ?? '',
  NOTION_API_KEY: process.env.NOTION_API_KEY ?? '',
  POSTGRES_SITE_ID: process.env.POSTGRES_SITE_ID ?? 0,
  POSTGRES_URL: process.env.POSTGRES_URL ?? '',
  PREVIEW_TOKEN: process.env.PREVIEW_TOKEN ?? '',
  REDIS_URL: process.env.REDIS_URL ?? '',
  REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN ?? '',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID ?? '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ?? '',
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? '',
})

if (!envServerParsed.success) {
  console.error(
    `- warn [ ⚠️ ] (server) Missing or invalid environment variable${
      envServerParsed.error.issues.length > 1 ? 's' : ''
    }:
${envServerParsed.error.issues.map((issue) => `  ${issue.path}: ${issue.message}`).join('\n')}
`,
  )
  process.exit(1)
}

const envServer = Object.freeze(envServerParsed.data)

export { envServer }
