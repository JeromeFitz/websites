"use client";

/**
 * @todo(api) NICE-125 this takes way too long to run
 *                on what should be a redis cache hit
 */
import useSWR from "swr";

import type { NotionColor } from "@/lib/drizzle/schemas/_notion/types";
import { fetcher } from "@/lib/fetcher";
import { getKeyAppleMusic, INIT } from "@/utils/getKeyAppleMusic";

import { CurrentlyItem } from "./Currently.Item";
import { CurrentlyWrapper } from "./Currently.Item.Wrapper";

const key = getKeyAppleMusic(0, { ...INIT, limit: 1 });

const options = {};

function CurrentlyMusicClient({
  titleSub,
  ...c
}: {
  color: NotionColor;
  href: string;
  icon: any;
  id: string;
  prefetch: boolean;
  title: string;
  titleSub: string;
}) {
  const { color, href, icon, id, prefetch, title } = c;
  const propsParent = { color, href, icon, id, prefetch, title };
  const { data, error, isLoading }: { data: any; error: any; isLoading: boolean } = useSWR(
    key,
    fetcher,
    options,
  );

  const hasError = !!error || data?.data === undefined;

  const top = hasError ? {} : data?.data[0];

  const headline = hasError ? titleSub[0] : top?.attributes.artistName;
  const subline = hasError ? titleSub[1] : top?.attributes.name;

  const props = {
    headline,
    id,
    isLoading,
    subline,
  };

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  );
}

export { CurrentlyMusicClient };
