import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: envServer.POSTGRES_URL!,
  },
  dialect: 'postgresql',
  out: './src/lib/drizzle/init/migrations',
  schema: './src/lib/drizzle/schemas/index.ts',
} satisfies Config
