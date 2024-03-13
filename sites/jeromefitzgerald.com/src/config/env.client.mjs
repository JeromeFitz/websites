// @ts-check
/**
 * @note(next) until we can do `next.config.ts` this needs to be `mjs`
 *
 * ref: https://github.com/vercel/next.js/pull/63051
 * ref: https://vercel.com/docs/projects/environment-variables/system-environment-variables
 *
 */
// import isCI from 'is-ci'
import { z } from 'zod'

const SITE = 'jeromefitzgerald.com'
const SITE_HTTPS = `https://${SITE}`

const envSchema = z.object({
  IS_DEV: z.boolean(),
  NEXT_PUBLIC__BASE_URL: z.enum([SITE_HTTPS]).default(SITE_HTTPS),
  NEXT_PUBLIC__FATHOM_SITE_ID: z.string().trim(),
  NEXT_PUBLIC__SITE: z.enum([SITE]).default(SITE),
  NEXT_PUBLIC_HOST_NAME: z.string().trim().optional(),
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().trim().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().trim().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  OVERRIDE_CACHE: z
    .string()
    .transform((value) => ['1', 'on', 'true', 'yes'].includes(value.toLowerCase()))
    .default('false'),
  VERCEL_ENV: z
    .enum(['development', 'production', 'preview'])
    .default('development'),
})

const envClientParsed = envSchema.safeParse({
  IS_DEV: process.env.NODE_ENV === 'development' ?? false,
  NEXT_PUBLIC__BASE_URL: `https://${process.env.NEXT_PUBLIC__SITE}`,
  NEXT_PUBLIC__FATHOM_SITE_ID: process.env.NEXT_PUBLIC__FATHOM_SITE_ID,
  NEXT_PUBLIC__SITE: process.env.NEXT_PUBLIC__SITE,
  NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  NODE_ENV: process.env.NODE_ENV,
  OVERRIDE_CACHE: process.env.OVERRIDE_CACHE,
  VERCEL_ENV: process.env.VERCEL_ENV,
})

if (!envClientParsed.success) {
  console.error(
    `- warn [ ⚠️ ] (client) Missing or invalid environment variable${
      envClientParsed.error.errors.length > 1 ? 's' : ''
    }:
${envClientParsed.error.errors.map((error) => `  ${error.path}: ${error.message}`).join('\n')}
`,
  )
  process.exit(1)
}

const envClientFreeze = Object.freeze(envClientParsed)
const envClient = envClientFreeze.data

// console.dir(`envClient:`)
// console.dir(envClient)

export { envClient }
