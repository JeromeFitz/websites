import type {
  BulletedListItemBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Fragment } from "react";
import type { ReactNode } from "react";

import { Anchor } from "@/components/anchor/index";
import { cx } from "@/utils/cx";

import { getAnnotations, getBlockKey } from "../notion.utils";
import { NotionEmoji as EmojiWrapper } from "./emoji";

type ApiColor =
  | "blue"
  | "blue_background"
  | "brown"
  | "brown_background"
  | "default"
  | "gray"
  | "gray_background"
  | "green"
  | "green_background"
  | "orange"
  | "orange_background"
  | "pink"
  | "pink_background"
  | "purple"
  | "purple_background"
  | "red"
  | "red_background"
  | "yellow"
  | "yellow_background";

// @todo(types)
const Text = ({ ref, ...props }: any) => {
  const { children } = props;

  const Component = props?.as ?? "p";
  const componentProps = {
    className: props?.className ?? undefined,
  };

  return (
    <Component ref={ref} {...componentProps}>
      {children}
    </Component>
  );
};

function Href({ children, href, ...props }: { children: ReactNode; href: string; [key: string]: unknown }) {
  return (
    <Anchor href={href} {...(props as any)}>
      {children}
    </Anchor>
  );
}

function RichText({
  block,
  order,
  ...props
}: {
  block:
    | any // @todo(types)
    | BulletedListItemBlockObjectResponse
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
    | NumberedListItemBlockObjectResponse
    | ParagraphBlockObjectResponse
    | QuoteBlockObjectResponse;
  order: number;
}) {
  const key = getBlockKey(block.id, block.type, order);
  const data: {
    color: ApiColor;
    rich_text: RichTextItemResponse[];
  } = block[block.type];

  if (!data) return null;

  const { rich_text } = data;

  return (
    <Text key={key} {...props}>
      <RichTextArray id={block.id} items={rich_text} />
    </Text>
  );
}

function RichTextArray({ id, items }: { id: string; items: RichTextItemResponse[] }) {
  // console.dir(`-- items --`)
  // console.dir(items)
  if (!items) return null;
  return (
    <>
      {items.map((item: RichTextItemResponse, _i) => {
        const key = getBlockKey(id, "rich_text", _i);
        const { annotations, href, plain_text } = item;
        const props: any = {
          className: cx(getAnnotations(annotations)),
        };

        const isInternalToNotion = !!href && !href?.includes("http");
        if (href && !isInternalToNotion) {
          return (
            <Href href={href} key={key} {...props}>
              {plain_text}
            </Href>
          );
        }

        const Component = props.className ? "span" : Fragment;
        if (Component === Fragment) delete props.className;

        return (
          <Component key={key} {...props}>
            <EmojiWrapper id={id} text={plain_text} />
            {/* {plain_text} */}
          </Component>
        );
      })}
    </>
  );
}

export { RichText };
export default RichText;
