import { envClient as env } from "next-config/env.client";

const KEY__PREFIX = env.NEXT_PUBLIC__SITE;

function getKey(slug: string) {
  const key = slug.includes(KEY__PREFIX) ? slug : `${KEY__PREFIX}${slug}`;
  return key;
}

export { getKey };
