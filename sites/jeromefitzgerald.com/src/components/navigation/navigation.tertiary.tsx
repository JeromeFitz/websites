"use client";

import { DotFilledIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation.js";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";

import { useStore as _useStore, useShallow } from "@/store/index";
import { cx } from "@/utils/cx";

const DropdownMenuRoot = DropdownMenu.Root as FC<{
  children?: ReactNode;
  defaultOpen?: boolean;
  dir?: "ltr" | "rtl";
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}>;

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      zzz_menuSecondaryActive: store.zzz_menuSecondaryActive,
      zzz_menuTertiary: store.zzz_menuTertiary,
      zzz_menuTertiaryActive: store.zzz_menuTertiaryActive,
      zzz_menuTertiaryActiveSet: store.zzz_menuTertiaryActiveSet,
    })),
  );
};

function NavigationTertiary({ className, order = 0 }: { className: string; order?: number }) {
  const router = useRouter();
  const {
    zzz_menuSecondaryActive,
    zzz_menuTertiary,
    zzz_menuTertiaryActive,
    zzz_menuTertiaryActiveSet,
  } = useStore();

  const mt = zzz_menuTertiary[zzz_menuSecondaryActive.id];
  const isDisabled = !mt;

  const DropdownMenuTriggerIconType = zzz_menuTertiaryActive.icon ?? DotFilledIcon;

  return (
    <div
      className={cx("hidden md:flex", "relative h-auto flex-none", "w-max", className)}
      style={{ opacity: 1, order }}
    >
      <div className="contents size-full">
        <div className={cx()}>
          <DropdownMenuRoot modal={false}>
            <DropdownMenu.Trigger className={cx(isDisabled && "hover:cursor-not-allowed")}>
              <Button
                aria-label={isDisabled ? "Disabled Tertiary Menu" : "Tertiary Menu"}
                className={cx(
                  "active:bg-accent-5! hover:bg-accent-4! bg-accent-3!",
                  "text-accent-11 hover:text-accent-11 active:text-accent-11",
                  "backdrop-blur-md transition-all",
                  "min-w-77.5!",
                )}
                disabled={isDisabled}
                size="3"
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  justifyContent: "space-between",
                  minWidth: "165px",
                  textAlign: "left",
                }}
                variant="outline"
              >
                <div className="flex items-center justify-start gap-2">
                  {!isDisabled && <DropdownMenuTriggerIconType className="ml-1 size-5" />}
                  {zzz_menuTertiaryActive?.title}
                </div>
                {!isDisabled && <DropdownMenu.TriggerIcon />}
              </Button>
            </DropdownMenu.Trigger>
            {!isDisabled && (
              <DropdownMenu.Content sideOffset={6} size="2" style={{ minWidth: "310px" }}>
                {mt?.map((item: any, idx: number) => {
                  if (!item.isActive && !item.isActiveMobile) return null;

                  const key = `tertiary-${idx}-${item.id}`;

                  if (item.title === "SEP") {
                    return <DropdownMenu.Separator key={key} />;
                  }

                  const DropdownMenuItemIcon = item.icon;

                  return (
                    <Fragment key={key}>
                      <DropdownMenu.Item
                        className={cx(
                          item.isActive && !item.isActiveMobile && "hidden",
                          !item.isActive && item.isActiveMobile && "md:hidden",
                        )}
                        key={key}
                        onSelect={() => {
                          zzz_menuTertiaryActiveSet(item);
                          // !!item.href &&
                          //   console.dir(
                          //     `zzz_menuTertiaryActiveSet (router): ${item.href}`,
                          //   )

                          if (item.href) router.push(item.href);
                        }}
                        textValue={item.title}
                      >
                        <DropdownMenuItemIcon className="size-5" />
                        <Text className="line-clamp-1" size="3">
                          {item.title}
                        </Text>
                      </DropdownMenu.Item>
                    </Fragment>
                  );
                })}
              </DropdownMenu.Content>
            )}
          </DropdownMenuRoot>
        </div>
      </div>
    </div>
  );
}

export { NavigationTertiary };
