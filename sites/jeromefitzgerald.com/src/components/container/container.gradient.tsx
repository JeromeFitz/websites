import { Box } from "@radix-ui/themes/dist/esm/components/box.js";

import { cx } from "@/utils/cx";

function ContainerGradient() {
  return (
    <>
      <Box
        className={cx(
          "pointer-events-none fixed top-0 z-30 w-full flex-none",
          "h-12.5 md:h-13.75",
          "backdrop-blur-xs",
          "opacity-80 md:opacity-90",
          "",
        )}
        data-name="Container: Blur"
        id="container--blur"
      />
      <Box
        className={cx(
          "pointer-events-none fixed top-0 z-40 w-full flex-none",
          "h-25 md:h-31.25",
          "bg-linear-to-b",
          "from-whiteA-10 dark:from-blackA-10",
          "from-65% md:from-45%",
          "",
        )}
        data-name="Container: Gradient"
        id="container--gradient"
      />
    </>
  );
}

export { ContainerGradient };
