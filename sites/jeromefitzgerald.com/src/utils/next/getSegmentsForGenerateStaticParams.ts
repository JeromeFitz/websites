import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import type { SegmentsArray } from '@/lib/drizzle/types'
import type { Segment } from '@/utils/getBySegment'

import { getBySegment } from '@/utils/getBySegment'
import { getKeyForGenerateStaticParams } from '@/utils/getKey'

export async function getSegmentsForGenerateStaticParams(segment: Segment) {
  if (envClient.IS_DEV) {
    return []
  }
  const segments: SegmentsArray[] = []
  const items: any = await getBySegment[segment].getItems({
    limit: getBySegment[segment].limit,
  })

  items.map((item: any) => {
    segments.push({ key: getKeyForGenerateStaticParams(segment, item.key) })
  })

  console.info(`> generateStaticParams (${segment}: ${segments.length})`)

  return segments
}
