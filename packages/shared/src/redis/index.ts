import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface RC {
  blocks: ListBlockChildrenResponse;
  page: PageObjectResponse;
}

import redis from "./redis";

export { getCache } from "./get-cache";
export { getKey } from "./get-key";
export { setCache } from "./set-cache";

export type { RC };
export default redis;
