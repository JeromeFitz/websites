import https from 'node:https'

import { Redis } from '@upstash/redis'

import 'server-only'

const redis = Redis.fromEnv({
  agent: new https.Agent({ keepAlive: true }),
  retry: {
    backoff: (retryCount) => Math.exp(retryCount) * 50,
    retries: 5,
  },
})

export default redis
