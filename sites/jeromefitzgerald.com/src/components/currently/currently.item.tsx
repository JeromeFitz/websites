import { Code, Em, Skeleton, Text } from "@radix-ui/themes";
// import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'

function CodeGhost({ children }: { children: React.ReactNode }) {
  return <Code variant="ghost">{children}</Code>;
}
function CurrentlyItem({
  hasTop = false,
  headline,
  id = "",
  isLoading,
  subline,
}: {
  hasTop?: boolean;
  headline: string;
  id?: string;
  isLoading: boolean;
  subline: string;
}) {
  const Component = id === "events" && hasTop ? CodeGhost : Text;
  return (
    <Skeleton loading={isLoading} minWidth="100%">
      <Text
        align="left"
        // as="h3"
        className="text-accentA-12 group-hover:text-accentA-11 transition-colors duration-300"
        size={{ initial: "3", md: "4" }}
        weight="medium"
      >
        <Component as="span">{headline}</Component>
        <Text className="hidden"> – </Text>
        <br />
        <Text className="line-clamp-1" size={{ initial: "4", md: "5" }}>
          <Text as="span">“</Text>
          <Text as="span" className="pr-0.5">
            <Em>{subline}</Em>
          </Text>
          <Text as="span">”</Text>
        </Text>
      </Text>
    </Skeleton>
  );
}

export { CurrentlyItem };
