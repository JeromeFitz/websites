import 'server-only'

import https from 'node:https'

import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv({
  agent: new https.Agent({ keepAlive: true }),
  retry: {
    retries: 5,
    backoff: (retryCount) => Math.exp(retryCount) * 50,
  },
})

export default redis
