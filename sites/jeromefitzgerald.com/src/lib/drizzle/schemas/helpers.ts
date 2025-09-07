import { integer, jsonb, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { cacheSites } from './cache-sites/schemas'

const initKeyValueTable = {
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  key: text().notNull(),
  uuid: uuid().defaultRandom().notNull(),
  value: jsonb().notNull().$type<any>(),
}

const timestamps = {
  insertedAt: timestamp('inserted_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}

const relations = {
  siteId: integer('site_id')
    .references(() => cacheSites.id)
    .notNull(),
}

export const init = {
  ...initKeyValueTable,
  ...timestamps,
  ...relations,
}
