import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const cacheSites = pgTable('cache_sites', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  insertedAt: timestamp().notNull().defaultNow(),
  key: text().notNull(),
  updatedAt: timestamp().notNull().defaultNow(),
  uuid: uuid().defaultRandom(),
  value: jsonb().notNull(),
})

export { cacheSites }
