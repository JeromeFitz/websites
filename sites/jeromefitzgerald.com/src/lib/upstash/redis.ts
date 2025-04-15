import 'server-only'

import https from 'node:https'

import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { Redis } from '@upstash/redis'

const redis = new Redis({
  agent: new https.Agent({ keepAlive: true }),
  retry: {
    backoff: (retryCount) => Math.exp(retryCount) * 50,
    retries: 5,
  },
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
  url: envServer.UPSTASH_REDIS_REST_URL,
})

export { redis }
