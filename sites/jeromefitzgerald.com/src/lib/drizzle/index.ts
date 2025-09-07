// import { neon } from '@neondatabase/serverless'
import { config as dotenvConfig } from 'dotenv'
// import { drizzle as _drizzle } from 'drizzle-orm/neon-http'
import { drizzle as _drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/lib/drizzle/schemas/index'

dotenvConfig()

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set')
}

/**
 * postgres
 */

// biome-ignore lint/style/noNonNullAssertion: migrate
const client = postgres(process.env.POSTGRES_URL!)
const drizzle = _drizzle(client, { casing: 'snake_case', schema })
/**
 * neon
 */
// const client = neon(process.env.POSTGRES_URL!)
// const drizzle = _drizzle(client, { casing: 'snake_case', schema })

export { client, drizzle }
