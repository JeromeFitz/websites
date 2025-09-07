import type { Config } from 'drizzle-kit'

import { envServer } from '@jeromefitz/next-config/env.server.mjs'

export default {
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: migrate
    url: envServer.POSTGRES_URL!,
  },
  dialect: 'postgresql',
  out: './src/lib/drizzle/init/migrations',
  schema: './src/lib/drizzle/schemas/index.ts',
} satisfies Config
