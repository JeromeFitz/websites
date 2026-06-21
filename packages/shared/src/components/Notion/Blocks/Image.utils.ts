// import { GetBlockResponse } from '@notionhq/client'
// import { PartialBlockObjectResponse } from '@notionhq/client'
import { filter as _filter, startsWith as _startsWith } from "lodash-es";

const FIND_ALT = "ALT: ";

function getImageAlt(comments: any[]) {
  const comment = comments[0];
  const c = _filter(comments, (comment) =>
    _startsWith(comment?.rich_text[0]?.plain_text, FIND_ALT),
  );
  return c && c.length > 0
    ? c[0]?.rich_text[0]?.plain_text.slice(FIND_ALT.length)
    : comment
      ? comment?.rich_text[0]?.plain_text
      : "";
}

// GetBlockResponse
// @todo(types) any
function getImageExpiration(block: any) {
  return block[block?.type]?.type === "external" ? null : block[block?.type]?.file?.expiry_time;
}

// PartialBlockObjectResponse
// @todo(types) any
function getImageUrl(block: any) {
  return block[block.type].type === "external"
    ? block[block?.type]?.external?.url
    : block[block?.type]?.file?.url;
}

export { getImageAlt, getImageExpiration, getImageUrl };
