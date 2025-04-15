/* eslint-disable perfectionist/sort-objects */
import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const cacheSites = pgTable('cache_sites', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: uuid().defaultRandom(),
  key: text().notNull(),
  value: jsonb().notNull(),
  insertedAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})

export { cacheSites }
