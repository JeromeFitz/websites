import { Box, Em, Flex, Text } from "@radix-ui/themes";
import { filter as _filter } from "lodash-es";

import { currently } from "@/data/currently";
import { cx } from "@/utils/cx";

function Currently() {
  const items = _filter(currently, { isActive: true });
  return (
    <Flex
      align="end"
      className={cx("order-0 place-content-center items-center overflow-visible")}
      direction="column"
      gap="10"
      height={{ initial: "min-content", md: "266px" }}
      justify="center"
      p="0"
      px={{ initial: "1", md: "0" }}
      style={{ opacity: 1 }}
      width="100%"
      wrap="nowrap"
    >
      <Box
        className={cx(
          "w-full",
          // 'hidden!', 'md:inline!'
        )}
        gridColumnStart={{ initial: "1", md: "1" }}
        gridColumnEnd={{ initial: "13", md: "13" }}
      >
        <Flex gap="5" direction="column" width="100%" py="6">
          <Text
            className={cx(
              "text-accentA-12",
              // 'uppercase md:capitalize'
            )}
            size={{ initial: "7", md: "8" }}
            // weight="bold"
          >
            <Em>
              Currently…
              <sup
                aria-hidden={true}
                className={cx(
                  "text-3 md:text-5 align-super",
                  // 'hidden',
                  // 'md:inline-block',
                )}
              >
                {items.length}
              </sup>
            </Em>
          </Text>
        </Flex>
      </Box>

      <Flex
        className={cx("place-content-start items-start")}
        direction={{ initial: "column", md: "row" }}
        gap="6"
        height="min-content"
        justify={{ initial: "start", md: "between" }}
        p="0"
        position="relative"
        style={{ opacity: 1 }}
        width="100%"
        wrap="nowrap"
      >
        <Flex
          className="hidden! content-center items-center overflow-visible rounded-md"
          content="center"
          direction="row"
          gap="10"
          justify="start"
          maxWidth={{ initial: "unset", md: "320px" }}
          position="relative"
          pr="0"
          style={{ opacity: 1 }}
          width={{ initial: "unset", md: "318px" }}
        >
          <Text className="text-accentA-12" size={{ initial: "7", md: "8" }} weight="medium">
            <Em>
              Currently…
              <sup
                aria-hidden={true}
                className="text-3 md:text-5 hidden align-super md:inline-block"
              >
                {items.length}
              </sup>
            </Em>
          </Text>
        </Flex>
        {items.map((c, idx) => {
          if (!c?.isActive) return null;

          const key = `currently-${idx}-${c.id}`;
          const Component = c.component;
          const IconComponent = c.icon;
          const icon = (
            <IconComponent
              className={cx(
                "m-2 rounded-md p-2 text-inherit opacity-100! md:p-2",
                "transition-colors",
                "bg-whiteA-10 group-hover:bg-whiteA-9",
                "dark:bg-blackA-10 dark:group-hover:bg-blackA-9",
                "size-10! md:size-12!",
              )}
            />
          );
          const titleSub = c?.titleSub.split(" – ");
          const { component: _c, icon: _icon, ...rest } = c;
          const props = { ...rest, icon, titleSub };

          // @ts-ignore
          return <Component key={key} {...props} />;
        })}
      </Flex>
    </Flex>
  );
}

export { Currently };
