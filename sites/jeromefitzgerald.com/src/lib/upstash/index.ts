import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface RC {
  blocks: ListBlockChildrenResponse;
  page: PageObjectResponse;
}

export { getCache } from "./get-cache";
export { getKey } from "./get-key";
export { redis } from "./redis";
export { setCache } from "./set-cache";

export type { RC };
