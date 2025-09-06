import path from 'node:path'

import { config as dotenvConfig } from 'dotenv'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { client, drizzle } from '../index'

dotenvConfig()

async function main() {
  await migrate(drizzle, {
    migrationsFolder: path.join(process.cwd(), '/src/lib/drizzle/init/migrations'),
  })
  console.log(`🏁 Migrations complete`)
  await client.end()
}

void main()
