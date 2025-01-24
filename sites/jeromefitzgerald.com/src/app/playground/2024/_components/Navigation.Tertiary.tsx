/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { DotFilledIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import {
  Content as DropdownMenuContent,
  Item as DropdownMenuItem,
  Root as DropdownMenuRoot,
  Separator as DropdownMenuSeparator,
  Trigger as DropdownMenuTrigger,
  TriggerIcon as DropdownMenuTriggerIcon,
} from '@radix-ui/themes/dist/esm/components/dropdown-menu.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { useRouter } from 'next/navigation.js'
import { Fragment } from 'react'

import { useStore as _useStore, useShallow } from '@/store/index'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      zzz_menuSecondaryActive: store.zzz_menuSecondaryActive,
      zzz_menuTertiary: store.zzz_menuTertiary,
      zzz_menuTertiaryActive: store.zzz_menuTertiaryActive,
      zzz_menuTertiaryActiveSet: store.zzz_menuTertiaryActiveSet,
    })),
  )
}

// @todo(complexity) 11
// eslint-disable-next-line complexity
function NavigationTertiary({ className, order = 0 }) {
  const router = useRouter()
  const {
    zzz_menuSecondaryActive,
    zzz_menuTertiary,
    zzz_menuTertiaryActive,
    zzz_menuTertiaryActiveSet,
  } = useStore()

  const mt = zzz_menuTertiary[zzz_menuSecondaryActive.id]
  const isDisabled = !mt
  // if (!mt) return null

  const DropdownMenuTriggerIconType = zzz_menuTertiaryActive.icon ?? DotFilledIcon

  return (
    <div
      className={cx(
        'hidden md:flex',
        'relative h-auto flex-none',
        'w-max',
        className,
      )}
      style={{ opacity: 1, order }}
    >
      <div className={cx('contents')}>
        <div className={cx()}>
          {/* @todo(radix) children */}
          {/* @ts-ignore */}
          <DropdownMenuRoot modal={false}>
            <DropdownMenuTrigger
              className={cx(isDisabled && 'hover:cursor-not-allowed')}
            >
              <Button
                aria-label={
                  isDisabled ? 'Disabled Secondary Menu' : 'Secondary Menu'
                }
                className={cx(
                  'bg-accent-3 hover:bg-accent-4 active:bg-accent-5',
                  'text-accent-11 hover:text-accent-11 active:text-accent-11',
                  'backdrop-blur-sm transition-all',
                  '!min-w-[310px]',
                )}
                // @todo(types)
                // @ts-ignore
                color={isDisabled ? 'gray' : 'accent'}
                disabled={isDisabled}
                size="3"
                style={{
                  display: 'flex',
                  gap: 'var(--space-2)',
                  justifyContent: 'space-between',
                  minWidth: '165px',
                  textAlign: 'left',
                }}
                variant="outline"
              >
                <div className="flex items-center justify-start gap-2">
                  {!isDisabled && <DropdownMenuTriggerIconType className="ml-1" />}
                  {zzz_menuTertiaryActive?.title}
                </div>
                {!isDisabled && <DropdownMenuTriggerIcon />}
              </Button>
            </DropdownMenuTrigger>
            {!isDisabled && (
              <DropdownMenuContent
                sideOffset={6}
                size="2"
                style={{ minWidth: '310px' }}
              >
                {mt?.map((item, idx) => {
                  if (!item.isActive && !item.isActiveMobile) return null

                  const key = `tertiary-${idx}-${item.id}`

                  if (item.title === 'SEP') {
                    return <DropdownMenuSeparator key={key} />
                  }

                  const DropdownMenuItemIcon = item.icon

                  return (
                    <Fragment key={key}>
                      {/* @ts-ignore */}
                      <DropdownMenuItem
                        className={cx(
                          item.isActive && !item.isActiveMobile && 'hidden',
                          !item.isActive && item.isActiveMobile && 'md:hidden',
                        )}
                        key={key}
                        onSelect={() => {
                          zzz_menuTertiaryActiveSet(item)
                          // !!item.href &&
                          //   console.dir(
                          //     `zzz_menuTertiaryActiveSet (router): ${item.href}`,
                          //   )
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          !!item.href && router.push(item.href)
                        }}
                        textValue={item.title}
                      >
                        <DropdownMenuItemIcon />
                        <Text className="line-clamp-1" size="3">
                          {item.title}
                        </Text>
                      </DropdownMenuItem>
                    </Fragment>
                  )
                })}
              </DropdownMenuContent>
            )}
          </DropdownMenuRoot>
        </div>
      </div>
    </div>
  )
}

export { NavigationTertiary }
