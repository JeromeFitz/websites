"use server";

import { revalidatePath } from "next/cache.js";
import type { NextRequest } from "next/server.js";
import { NextResponse } from "next/server.js";

import { getEvent } from "@/lib/drizzle/schemas/cache-events/queries";
import type { Event } from "@/lib/drizzle/schemas/cache-events/types";
import { getShow } from "@/lib/drizzle/schemas/cache-shows/queries";
import type { Show } from "@/lib/drizzle/schemas/cache-shows/types";
import { buildInitialCache } from "@/lib/notion/build-initial-cache";
import { getKey } from "@/utils/get-key";
import { isEmpty } from "@/utils/is-empty";

import { isValid as _isValid } from "./actions";

type Validated = {
  isDynamic?: boolean;
  key?: string;
  revalidated?: boolean;
  timestamp?: number;
};

async function test({
  key,
  path,
  segment,
}: {
  key: string;
  path: string;
  segment: string;
}): Promise<Validated> {
  return { isDynamic: false, key, revalidated: true, timestamp: Date.now() };
}

export async function POST(request: NextRequest) {
  const { path, segment, slug } = await request.json();
  const isDynamic = ["\\[", "\\]"].every((el) => {
    return path.match(new RegExp(el, "i"));
  });
  const isSpecificRoute = true;
  const isValid = _isValid(request.headers.get("x-revalidate-signature-256"));

  if (!isValid) {
    return NextResponse.json({
      revalidated: false,
      timestamp: Date.now(),
    });
  }

  const key = getKey(segment, slug);
  console.dir(`key: ${key}`);
  let items: Event[] | Show[] = [];
  if (segment === "shows") {
    console.dir(`=> events`);
    items = await getShow({ key });
  }
  if (segment === "events") {
    console.dir(`=> events`);
    items = await getEvent({ key });
  }

  if (isEmpty(items)) {
    return NextResponse.json({
      revalidated: false,
      timestamp: Date.now(),
    });
  }
  revalidatePath(key);
  await buildInitialCache({ revalidate: true, segment });

  const result = await test({ key, path, segment });

  if (isSpecificRoute) {
    revalidatePath(key);
  }
  if (isDynamic) {
    revalidatePath(path, "page");
  }

  return NextResponse.json({
    isDynamic,
    key,
    timestamp: Date.now(),
    ...result,
  });
}
