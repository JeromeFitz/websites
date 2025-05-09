/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import {
  Content as DropdownMenuContent,
  Item as DropdownMenuItem,
  Root as DropdownMenuRoot,
  Separator as DropdownMenuSeparator,
  Sub as DropdownMenuSub,
  SubContent as DropdownMenuSubContent,
  SubTrigger as DropdownMenuSubTrigger,
  Trigger as DropdownMenuTrigger,
  TriggerIcon as DropdownMenuTriggerIcon,
} from '@radix-ui/themes/dist/esm/components/dropdown-menu.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { useRouter } from 'next/navigation.js'
import { Fragment } from 'react'

import { HomeIcon } from '@/components/Icon/index'
import { useStore as _useStore, useShallow } from '@/store/index'
import { cx } from '@/utils/cx'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      zzz_menuSecondary: store.zzz_menuSecondary,
      zzz_menuSecondaryActive: store.zzz_menuSecondaryActive,
      zzz_menuSecondaryActiveSet: store.zzz_menuSecondaryActiveSet,
      zzz_menuTertiary: store.zzz_menuTertiary,
      zzz_menuTertiaryActiveSet: store.zzz_menuTertiaryActiveSet,
    })),
  )
}

function NavigationSecondary({ order = 0 }) {
  const router = useRouter()
  const {
    zzz_menuSecondary,
    zzz_menuSecondaryActive,
    zzz_menuSecondaryActiveSet,
    zzz_menuTertiary,
    zzz_menuTertiaryActiveSet,
  } = useStore()

  const isDisabled = zzz_menuSecondaryActive?.icon ? false : true
  const IconSecondary = zzz_menuSecondaryActive?.icon ?? HomeIcon

  return (
    <div
      className={cx('relative h-auto w-min flex-none')}
      style={{ opacity: 1, order }}
    >
      <div className="contents size-full">
        {/* @todo(radix) children */}
        {/* @ts-ignore */}
        <DropdownMenuRoot modal={false}>
          <DropdownMenuTrigger>
            <Flex
              asChild
              className={cx(
                '!bg-accent-1 !hover:bg-accent-2 transition-colors',
                // 'w-[165px] max-w-[165px] min-w-[128px]',
                // 'flex items-center justify-between gap-4 text-left',
              )}
              gap="4"
              justify="between"
              maxWidth="165px"
              minWidth="128px"
              width="165px"
            >
              <Button
                className="text-left"
                // @todo(types)
                // @ts-ignore
                color={isDisabled ? 'gray' : 'accent'}
                disabled={isDisabled}
                size="3"
                variant="outline"
              >
                <div className="flex items-center justify-start gap-2">
                  {!isDisabled && <IconSecondary className="ml-1" />}
                  {!isDisabled && <Text>{zzz_menuSecondaryActive.title}</Text>}
                </div>
                <DropdownMenuTriggerIcon />
              </Button>
            </Flex>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-50 min-w-[165px]"
            sideOffset={6}
            size="2"
          >
            {zzz_menuSecondary.map((item: any, idx: number) => {
              if (!item.isActive && !item.isActiveMobile) return null
              const key = `secondary-${idx}-${item.id}`
              if (item.title === 'SEP') {
                return <DropdownMenuSeparator key={key} />
              }

              const Icon = item.icon
              const mt = zzz_menuTertiary[item.id]

              return (
                <Fragment key={key}>
                  <Flex
                    asChild
                    display={{
                      initial: mt ? 'none' : 'flex',
                      md: 'flex',
                    }}
                  >
                    <DropdownMenuItem
                      className={cx(
                        !!mt && 'hidden md:flex',
                        !item.isActive && item.isActiveMobile && '!hidden',
                      )}
                      onSelect={() => {
                        zzz_menuSecondaryActiveSet(item)
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        !!item.href && router.push(item.href)
                      }}
                      textValue={item.title}
                    >
                      <Icon className="hidden md:inline-flex" />
                      <Text size={{ initial: '2', md: '3' }}>{item.title}</Text>
                    </DropdownMenuItem>
                  </Flex>
                  {!!mt && (
                    <Flex asChild>
                      <DropdownMenuSub>
                        <Flex asChild display={{ initial: 'flex', md: 'none' }}>
                          <DropdownMenuSubTrigger className="hidden">
                            <Text size={{ initial: '2', md: '3' }}>
                              {item.title}
                            </Text>
                          </DropdownMenuSubTrigger>
                        </Flex>
                        {/* @ts-ignore */}
                        <DropdownMenuSubContent size={{ initial: '2', md: '3' }}>
                          {/* @ts-ignore */}
                          {mt.map((itemSub) => {
                            if (!itemSub.isActive && !itemSub.isActiveMobile)
                              return null

                            // const Icon = itemSub.icon

                            const key = `sub-item--${itemSub.id}`

                            return (
                              <Fragment key={key}>
                                <Flex asChild>
                                  <DropdownMenuItem
                                    className={cx(
                                      itemSub.isActive &&
                                        !itemSub.isActiveMobile &&
                                        'hidden md:flex',
                                      !itemSub.isActive &&
                                        itemSub.isActiveMobile &&
                                        'md:hidden',
                                    )}
                                    onSelect={() => {
                                      zzz_menuSecondaryActiveSet(item)
                                      zzz_menuTertiaryActiveSet(itemSub)
                                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                      !!itemSub.href && router.push(itemSub.href)
                                    }}
                                  >
                                    <Text
                                      className="max-w-[175px] truncate"
                                      size={{ initial: '2', md: '3' }}
                                    >
                                      {itemSub.title}
                                    </Text>
                                  </DropdownMenuItem>
                                </Flex>
                              </Fragment>
                            )
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </Flex>
                  )}
                </Fragment>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
    </div>
  )
}

export { NavigationSecondary }
