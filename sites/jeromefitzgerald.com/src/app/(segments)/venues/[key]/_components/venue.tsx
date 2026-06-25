import { Flex, Heading, Text } from "@radix-ui/themes";
import { format } from "date-fns";

import { ImageNotion } from "@/components/image/image.notion";
import { segment } from "@/lib/drizzle/schemas/cache-venues/queries";
import type { Venue as VenueType } from "@/lib/drizzle/schemas/cache-venues/types";

export function Venue({ item }: { item: VenueType }) {
  return (
    <Flex
      align="start"
      asChild
      direction="column"
      gap="1"
      justify="between"
      key={item.id}
      my="4"
      py="2"
      width="100%"
    >
      <section>
        <Heading as="h2" highContrast size="5">
          “{item.title}”
        </Heading>
        <Heading as="h3" highContrast size="4">
          {item.slugPreview}
        </Heading>
        <hr className="my-2 w-full" />
        <Text size="1">ISO: {format(item.datePublished, "yyyy-MM-dd")}</Text>
        <hr className="my-2 w-full" />
        <Flex>
          <ImageNotion item={item} segment={segment} />
        </Flex>
      </section>
    </Flex>
  );
}
