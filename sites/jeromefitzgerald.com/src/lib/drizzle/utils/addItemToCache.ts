import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { TZDate } from '@date-fns/tz'
import { format, isAfter, parseISO } from 'date-fns'
import { and, eq, sql } from 'drizzle-orm'

import type { Segment } from '@/utils/getBySegment'

import { drizzle } from '@/lib/drizzle/index'
import { pre_addImageKeyValueToCache } from '@/lib/drizzle/schemas/cache-images/actions'
import { getBySegment } from '@/utils/getBySegment'
import { isEmpty } from '@/utils/isEmpty'

import { getKeyValue } from './getKeyValue'

const TZ_UTC = 'UTC'
const formatConfig = `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`

/* eslint-disable perfectionist/sort-objects */
async function addItemToCache({
  key,
  segment,
  value,
}: {
  key: string
  segment: Segment
  value: any
}) {
  /**
   * Check if Exists
   */
  const item: any = await getKeyValue({ key, segment })
  const logMessage = `addItemToCache(${segment})[X]: ${key}`
  console.log(logMessage.replace('[X]', '[ info ]'))
  if (isEmpty(item)) {
    console.log(logMessage.replace('[X]', '[insert]'))
    await drizzle
      .insert(getBySegment[segment].drizzleDatabase)
      .values({ siteId: envServer.POSTGRES_SITE_ID, key, value })
  } else {
    // console.dir(`~> segment: ${segment}`)
    /**
     * @note(notion) blocks does not have `last_edited_time` at root
     */
    let isExpired = true
    if (segment !== 'blocks') {
      const lastEditedNotion = format(
        new TZDate(value[0].last_edited_time, TZ_UTC),
        formatConfig,
      )
      const lastEditedPostgres = format(
        new TZDate(item[0].value[0].last_edited_time, TZ_UTC),
        formatConfig,
      )
      console.dir(`---`)
      console.dir(`lastEditedPostgres:`)
      console.dir(lastEditedPostgres)
      console.dir(`lastEditedNotion:`)
      console.dir(lastEditedNotion)
      isExpired = isAfter(parseISO(lastEditedNotion), parseISO(lastEditedPostgres))
    }
    if (isExpired) {
      console.log(logMessage.replace('[X]', '[update]'))
      await drizzle
        .update(getBySegment[segment].drizzleDatabase)
        .set({
          key,
          value,
          updated_at: sql`NOW()`,
        })
        .where(
          and(
            eq(
              getBySegment[segment].drizzleDatabase.siteId,
              envServer.POSTGRES_SITE_ID,
            ),
            eq(getBySegment[segment].drizzleDatabase.key, key),
          ),
        )
    } else {
      console.log(logMessage.replace('[X]', '[skip..]'))
    }
  }

  /**
   * Custom Addition for Placeholder Image
   */
  // console.dir(`--`)
  // console.dir(value[0]?.object === 'page')
  if (value[0]?.object === 'page') {
    const image = value[0]?.properties['SEO.Image']?.files[0] || []
    if (!isEmpty(image)) {
      await pre_addImageKeyValueToCache({ image })
    }
  }
}

/**
 * Custom Override specifically when updating Expired Images from Notion
 */
async function overrideItemToCache({
  key,
  segment,
  value,
}: {
  key: string
  segment: Segment
  value: any
}) {
  const logMessage = `overideItemToCache(${segment})[X]: ${key}`
  console.log(logMessage.replace('[X]', '[override]'))
  await drizzle
    .update(getBySegment[segment].drizzleDatabase)
    .set({
      key,
      value,
      updatedAt: sql`NOW()`,
    })
    .where(
      and(
        eq(getBySegment[segment].drizzleDatabase.siteId, envServer.POSTGRES_SITE_ID),
        eq(getBySegment[segment].drizzleDatabase.key, key),
      ),
    )
}

export { addItemToCache, overrideItemToCache }
