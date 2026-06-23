import type { Metadata, ResolvingMetadata } from "next";

// import { getBlocks } from '@/lib/drizzle/schemas/cache-blocks/queries'
import { getPage, segment as segmentPage } from "@/lib/drizzle/schemas/cache-pages/queries";
import type { Page } from "@/lib/drizzle/schemas/cache-pages/types";
import { getShows, segment } from "@/lib/drizzle/schemas/cache-shows/queries";
import { buildInitialCache } from "@/lib/notion/build-initial-cache";
import { getKey } from "@/utils/get-key";
import { isEmpty } from "@/utils/is-empty";

import { List } from "./_components/list";

// export const dynamic = 'force-dynamic'
export const dynamic = "force-static";

interface Props {
  params: Promise<{ key: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const key = getKey(segmentPage, segment);
  const infoInit: Page[] = await getPage({ key });
  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    };
  }
  if (isEmpty(infoInit)) {
    return {
      title: `404: ${segment}`,
    };
  }

  const info = infoInit[0];
  const previousImages = (await parent).openGraph?.images || [];

  const title = `${info.title}`;
  const description = `${info.seoDescription}`;

  // const seoImage: any = info.seoImage
  // const imageUrl = info.seoImage ? seoImage[seoImage?.type]?.url : null
  // const imageData = getImageKeySlug(imageUrl)
  // const imageKeyValue = await getImageKeyValue({ key: imageData.key })
  // const image: any = imageKeyValue[0].value[0]

  return {
    description,
    openGraph: {
      description,
      images: [...previousImages],
      title,
    },
    title,
  };
}

export default async function Index() {
  const items = await getShows();
  await buildInitialCache({ segment });

  return (
    <>
      <List items={items} />
    </>
  );
}
