import { Flex, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";

export default function NotFound() {
  const item = {
    id: "404",
    subtitle: "Not Found",
    title: "404",
  };

  return (
    <>
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
            {item.subtitle}
          </Heading>
          <hr className="my-2 w-full" />
          <Text>Nothing so see here.</Text>
          <Link asChild highContrast>
            <NextLink href="/">Go Home</NextLink>
          </Link>
        </section>
      </Flex>
    </>
  );
}
