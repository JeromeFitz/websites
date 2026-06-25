import { Flex } from "@radix-ui/themes";

function UL({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Flex asChild className={className} direction="column" gap="4">
      <ul>{children}</ul>
    </Flex>
  );
}

export { UL };
