// import Redis from 'ioredis'
// import { Ratelimit } from '@upstash/ratelimit'
import https from 'node:https'

import { Redis } from '@upstash/redis'
/**
 * @ref https://github.com/luin/ioredis#transparent-key-prefixing
 *
 */
// const redis = new Redis(process.env.REDIS_URL, {
//   keyPrefix: `${process.env.NEXT_PUBLIC__SITE}/`,
// })

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// })

/**
 * @note(upstash) Redis.fromEnv() will read the following from environment variables:
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 */
const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

export default redis
