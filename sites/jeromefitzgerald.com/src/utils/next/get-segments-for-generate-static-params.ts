import { envClient } from "next-config/env.client";

import type { SegmentsArray } from "@/lib/drizzle/types";
import type { Segment } from "@/utils/get-by-segment";
import { getBySegment } from "@/utils/get-by-segment";
import { getKeyForGenerateStaticParams } from "@/utils/get-key";

export async function getSegmentsForGenerateStaticParams(segment: Segment) {
  if (envClient.IS_DEV) {
    return [];
  }
  const segments: SegmentsArray[] = [];
  const items: any = await getBySegment[segment].getItems({
    limit: getBySegment[segment].limit,
  });

  items.map((item: any) => {
    segments.push({ key: getKeyForGenerateStaticParams(segment, item.key) });
  });

  console.info(`> generateStaticParams (${segment}: ${segments.length})`);

  return segments;
}
