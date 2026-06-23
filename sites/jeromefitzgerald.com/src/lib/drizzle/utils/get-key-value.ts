import { sql } from "drizzle-orm";

import { drizzle } from "@/lib/drizzle/index";
import type { Segment } from "@/utils/get-by-segment";
import { getBySegment } from "@/utils/get-by-segment";

async function getKeyValue({ key, segment }: { key: string; segment: Segment }) {
  return await drizzle.execute(
    sql.raw(
      `SELECT id, key, value, inserted_at, updated_at FROM ${getBySegment[segment].drizzleDatabaseString} WHERE key = '${key}'`,
    ),
  );
}

export { getKeyValue };
