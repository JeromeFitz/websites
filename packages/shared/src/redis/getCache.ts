import "server-only";
import type { RC } from ".";
import redis, { getKey } from ".";

async function getCache({ slug }: { slug: string }) {
  const key = getKey(slug);
  const cache = await redis.get<RC>(key);
  return cache;
}

export { getCache };
