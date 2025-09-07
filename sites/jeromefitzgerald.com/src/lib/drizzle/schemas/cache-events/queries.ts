import type { Event } from '@/lib/drizzle/schemas/cache-events/types'
import type { Segment } from '@/utils/getBySegment'

import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
export const segment: Segment = 'events'

const orderBy_default = `ORDER BY
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' DESC`

const sqlBase = `
SELECT
  id as pid,
	key,
  value,
	inserted_at AS "insertedAt",
	updated_at AS "updatedAt",
  arr.item_object -> 'properties' -> 'Date' -> 'date' ->> 'start' AS date,
  arr.item_object -> 'properties' -> 'Date.Created' ->> 'created_time' AS "dateCreated",
  arr.item_object -> 'properties' -> 'Date.DayOfMonth' -> 'formula' ->> 'string' AS "dateDayOfMonth",
  arr.item_object -> 'properties' -> 'Date.DayOfMonthOrdinal' -> 'formula' ->> 'string' AS "dateDayOfMonthOrdinal",
  arr.item_object -> 'properties' -> 'Date.DayOfWeek' -> 'formula' ->> 'string' AS "dateDayOfWeek",
  arr.item_object -> 'properties' -> 'Date.DayOfWeekAbbr' -> 'formula' ->> 'string' AS "dateDayOfWeekAbbr",
  arr.item_object -> 'properties' -> 'Date.DaysUntilEvent' -> 'formula' ->> 'number' AS "dateDaysUntilEvent",
  arr.item_object -> 'properties' -> 'Date.HoursUntilEvent' -> 'formula' ->> 'number' AS "dateHoursUntilEvent",
  arr.item_object -> 'properties' -> 'Date.ISO' -> 'formula' ->> 'string' AS "dateIso",
  arr.item_object -> 'properties' -> 'Date.Month' -> 'formula' ->> 'string' AS "dateMonth",
  arr.item_object -> 'properties' -> 'Date.MonthNameAbbr' -> 'formula' ->> 'string' AS "dateMonthNameAbbr",
  arr.item_object -> 'properties' -> 'Date.Published' -> 'date' ->> 'start' AS "datePublished",
  arr.item_object -> 'properties' -> 'Date.Time' -> 'formula' ->> 'string' AS "dateTime",
  arr.item_object -> 'properties' -> 'Date.TimeZone' -> 'formula' ->> 'string' AS "dateTimeZone",
  arr.item_object -> 'properties' -> 'Date.WeekNumber' -> 'formula' ->> 'string' AS "dateWeekNumber",
  arr.item_object -> 'properties' -> 'Date.Year' -> 'formula' ->> 'string' AS "dateYear",
  arr.item_object ->> 'id' AS id,
  CAST(arr.item_object -> 'properties' -> 'Is.Active' ->> 'checkbox' AS boolean) AS "isActive",
  CAST(arr.item_object -> 'properties' -> 'Is.Indexed' ->> 'checkbox' AS boolean) AS "isIndexed",
  CAST(arr.item_object -> 'properties' -> 'Is.Published' ->> 'checkbox' AS boolean) AS "isPublished",
  arr.item_object -> 'properties' -> 'Relation.People.Guests' -> 'relation' AS "relationPeopleGuests",
  arr.item_object -> 'properties' -> 'Relation.People.HouseManager' -> 'relation' AS "relationPeopleHouseManager",
  arr.item_object -> 'properties' -> 'Relation.People.Interns' -> 'relation' AS "relationPeopleInterns",
  arr.item_object -> 'properties' -> 'Relation.People.StageManager' -> 'relation' AS "relationPeopleStageManager",
  arr.item_object -> 'properties' -> 'Relation.Shows.Music' -> 'relation' AS "relationShowsMusic",
  arr.item_object -> 'properties' -> 'Relation.Shows.Primary' -> 'relation' AS "relationShowsPrimary",
  arr.item_object -> 'properties' -> 'Relation.Shows.Supporting' -> 'relation' AS "relationShowsSupporting",
  arr.item_object -> 'properties' -> 'Relation.Venues' -> 'relation' AS "relationVenues",
  arr.item_object -> 'properties' -> 'Rollup.People.Guest.Title' -> 'rollup' -> 'array' AS "rollupPeopleGuestTitle",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Complexity' -> 'rollup' -> 'array' AS "rollupShowsComplexity",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Music.Title' -> 'rollup' -> 'array' AS "rollupShowsMusicTitle",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Primary.Cast.Title' -> 'rollup' -> 'array' AS "rollupShowsPrimaryCastTitle",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Primary.Slug' -> 'rollup' -> 'array' AS "rollupShowsPrimarySlug",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Primary.Tags' -> 'rollup' -> 'array' AS "rollupShowsPrimaryTags",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Primary.Title' -> 'rollup' -> 'array' AS "rollupShowsPrimaryTitle",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Producer.Title' -> 'rollup' -> 'array' AS "rollupShowsProducerTitle",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Supporting.Tags' -> 'rollup' -> 'array' AS "rollupShowsSupportingTags",
  arr.item_object -> 'properties' -> 'Rollup.Shows.Supporting.Title' -> 'rollup' -> 'array' AS "rollupShowsSupportingTitle",
  arr.item_object -> 'properties' -> 'Rollup.Venues.Slug' -> 'rollup' -> 'array' AS "rollupVenuesSlug",
  arr.item_object -> 'properties' -> 'Rollup.Venues.Slug' -> 'rollup' -> 'array' AS "rollupVenuesSlug",
  arr.item_object -> 'properties' -> 'Rollup.Venues.Title' -> 'rollup' -> 'array' AS "rollupVenuesTitle",
  arr.item_object -> 'properties' -> 'SEO.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoDescription",
  arr.item_object -> 'properties' -> 'SEO.Image' -> 'files' -> 0 AS "seoImage",
  arr.item_object -> 'properties' -> 'SEO.Image.Description' -> 'rich_text' -> 0 ->> 'plain_text' AS "seoImageDescription",
  arr.item_object -> 'properties' -> 'Slug' -> 'rich_text' -> 0 ->> 'plain_text' AS slug,
  arr.item_object -> 'properties' -> 'Slug.Preview' -> 'formula' ->> 'string' AS "slugPreview",
  arr.item_object -> 'properties' -> 'Slug.Preview.ET' -> 'formula' ->> 'string' AS "slugPreviewEt",
  arr.item_object -> 'properties' -> 'Slug.Preview.Override' -> 'formula' ->> 'string' AS "slugPreviewOverride",
  arr.item_object -> 'properties' -> 'Slug.Preview.UTC' -> 'formula' ->> 'string' AS "slugPreviewUtc",
  arr.item_object -> 'properties' -> 'Tags' -> 'multi_select' AS "tags",
  arr.item_object -> 'properties' -> 'Title' -> 'title' -> 0 ->> 'plain_text' AS "title",
  arr.item_object -> 'properties' -> 'URL.Theater' ->> 'url' AS "urlTheater",
  arr.item_object -> 'properties' -> 'URL.Ticket' ->> 'url' AS "urlTicket"
FROM
	cache_events,
	jsonb_array_elements(value)
WITH
	ordinality arr (item_object, POSITION)
WHERE
	site_id = ${envServer.POSTGRES_SITE_ID}
[REPLACE_WHERE]
[REPLACE_ORDERBY]
[REPLACE_LIMIT]
`
export async function getEvents(): Promise<Event[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
export async function getEventsWithLimit({
  limit = 10,
}: {
  limit: number
}): Promise<Event[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', '')
        .replace('[REPLACE_ORDERBY]', orderBy_default)
        .replace('[REPLACE_LIMIT]', `LIMIT ${limit}`),
    ),
  )
}
export async function getEvent({ key }: { key: string }): Promise<Event[]> {
  return await drizzle.execute(
    sql.raw(
      sqlBase
        .replace('[REPLACE_WHERE]', `AND key = '${key}'`)
        .replace('[REPLACE_ORDERBY]', '')
        .replace('[REPLACE_LIMIT]', ''),
    ),
  )
}
