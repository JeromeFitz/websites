/**
 * @note(next-notion) Default Configuration
 */
import { lazy } from "react";

// import { Divider } from './blocks/divider'
// import { ListBulleted } from './blocks/list-bulleted'
// import { ListColumn } from './blocks/list-column'
// import { RichText } from './blocks/rich-text'

const OBJECTS = { BLOCK: "block", LIST: "list" };
const TYPES = {
  BLOCK: "block",
  BULLETED_LIST_ITEM: "bulleted_list_item",
  CHILD_PAGE: "child_page",
  COLUMN: "column",
  NUMBERED_LIST_ITEM: "numbered_list_item",
};

/**
 * blocks left:
 * - audio
 * - bookmark
 * - breadcrumb
 * - code
 * - divider
 * - embed
 * - equation
 * - image
 * - link_to_page
 * - pdf
 * - synced_block
 * - table_of_contents
 * - table_row
 * - template
 * - to_do
 * - toggle
 * - video
 */
const blocks = {
  bulleted_list: {
    as: "ul",
    className: "",
    component: lazy(() => import("./blocks/list-bulleted")),
    // component: ListBulleted,
  },
  bulleted_list_item: {
    as: "li",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  callout: {
    as: "blockquote",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  column: {
    as: "div",
    className: "",
    component: "div",
  },
  column_list: {
    as: "div",
    className: "",
    component: lazy(() => import("./blocks/list-column")),
    // component: ListColumn,
  },
  divider: {
    as: "hr",
    className: "",
    component: lazy(() => import("./blocks/divider")),
    // component: Divider,
  },
  heading_1: {
    as: "h1",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  heading_2: {
    as: "h2",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  heading_3: {
    as: "h3",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  numbered_list: {
    as: "ol",
    className: "",
    component: lazy(() => import("./blocks/list-bulleted")),
    // component: ListBulleted,
  },
  numbered_list_item: {
    as: "li",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  paragraph: {
    as: "p",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
  quote: {
    as: "blockquote",
    className: "",
    component: lazy(() => import("./blocks/rich-text")),
    // component: RichText,
  },
};

export { blocks, OBJECTS, TYPES };
