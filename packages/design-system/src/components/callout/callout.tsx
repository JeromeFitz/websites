import { Callout } from "@radix-ui/themes";
import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import { FileTextIcon } from "../icon/index";

interface AdditionalProps {
  children?: ReactNode;
  className?: string;
  classNameText?: string;
  color?: string;
  icon?: any;
}
type CalloutRootPropsImpl = AdditionalProps & Callout.RootProps;

function CalloutImpl({
  children = <>This page is in the process of being updated.</>,
  className = "",
  classNameText = "",
  color = "pink",
  icon: Icon = FileTextIcon,
  size = "2",
  variant = "soft",
}: CalloutRootPropsImpl) {
  return (
    <Callout.Root
      className={cx("w-full font-mono", className)}
      color={color}
      size={size}
      variant={variant}
    >
      <Callout.Icon>
        <Icon />
      </Callout.Icon>
      <Callout.Text className={classNameText}>{children}</Callout.Text>
    </Callout.Root>
  );
}

export { CalloutImpl as Callout };
