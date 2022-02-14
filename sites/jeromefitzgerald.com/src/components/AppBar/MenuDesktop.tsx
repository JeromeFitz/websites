import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  // DropdownMenuRadioItem,
  // DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  // DropdownMenuRadioGroup,
  // DropdownMenuGroup,
  Flex,
  IconButton,
} from '@jeromefitz/design-system/components'
// import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'
import { styled } from '@jeromefitz/design-system/stitches.config'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useEffectOnce } from 'react-use'

import { navigation } from '~config/navigation'

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: '$colors$violet11',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$colores$slate3',
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$colors$violet9',
    color: '$colors$violet1',
  },
}
/**
 * @hack ts-ignore
 *
 * Not sure why all of a sudden this is happening
 *  on custom `styled` components
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const DropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//   position: 'absolute',
//   left: 0,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// })
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DropdownMenuTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: '$colors$violet4',
    color: '$colors$violet11',
  },
  ...itemStyles,
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  mx: '$3',
  fill: 'white',
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RightSlot = styled('div', {
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: 'white' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const MenuDesktop = () => {
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
  })
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Customise options">
            <Button css={{ '&:hover': { cursor: 'pointer' } }} size="1">
              <HamburgerMenuIcon />
            </Button>
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent css={{ pl: '$1' }} alignOffset={-5} sideOffset={6}>
          {navigationNonMutated &&
            Object.keys(navigationNonMutated).map((k) => {
              const section = navigationNonMutated[k]
              const { items } = section
              const settings = section.settings.dropdown

              return (
                <React.Fragment key={`dml-${k}`}>
                  {settings.inline ? (
                    <>
                      {settings.label && (
                        <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                      )}
                      {!!items &&
                        items?.map((item, itemIdx) => {
                          // console.dir(`item:`)
                          // console.dir(item)
                          return (
                            <React.Fragment key={`dml-${k}-${itemIdx}`}>
                              <DropdownMenuItem>
                                <Flex align="center" justify="start" gap="2">
                                  {item.icon && item.icon}
                                  {item.title}
                                </Flex>
                                {item.rightSlot && (
                                  <>
                                    <RightSlot>{item.rightSlot}</RightSlot>
                                  </>
                                )}
                              </DropdownMenuItem>
                              {item.separator && <DropdownMenuSeparator />}
                            </React.Fragment>
                          )
                        })}
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTriggerItem>
                          <Flex align="center" justify="start" gap="2">
                            {section.icon && section.icon}
                            {section.title}
                          </Flex>
                          <RightSlot>
                            <ChevronRightIcon />
                          </RightSlot>
                        </DropdownMenuTriggerItem>
                        <DropdownMenuContent alignOffset={-5} sideOffset={6}>
                          {!!items &&
                            items.map((item, itemIdx) => {
                              return (
                                <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                  <DropdownMenuItem>
                                    <Flex align="center" justify="start" gap="2">
                                      {item.icon && item.icon}
                                      {item.title}
                                    </Flex>
                                    {item.rightSlot && (
                                      <>
                                        <RightSlot>{item.rightSlot}</RightSlot>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  {item.separator && <DropdownMenuSeparator />}
                                </React.Fragment>
                              )
                            })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {settings.separator && <DropdownMenuSeparator />}
                </React.Fragment>
              )
            })}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  )
}

export { MenuDesktop }
