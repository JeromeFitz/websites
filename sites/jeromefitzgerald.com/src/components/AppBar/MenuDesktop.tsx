import {
  // useToast,
  Box,
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
import { styled } from '@jeromefitz/design-system/stitches.config'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { useUI } from '~context/UI'

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

// const DropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//   position: 'absolute',
//   left: 0,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// })
const DropdownMenuTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: '$colors$violet4',
    color: '$colors$violet11',
  },
  ...itemStyles,
})
const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  mx: '$3',
  fill: '$panel',
})
const RightSlot = styled('div', {
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: '$colors$hiContrast' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const MenuDesktop = ({ handleSelect, navigationNonMutated }) => {
  const { theme } = useTheme()
  const { audio } = useUI()

  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            aria-label="Open Menu"
            css={{ '&:hover': { cursor: 'pointer' } }}
            size="1"
            variant=""
          >
            <HamburgerMenuIcon />
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
                        // @todo(complexity) 12
                        // eslint-disable-next-line complexity
                        items?.map((item, itemIdx) => {
                          // console.dir(`item:`)
                          // console.dir(item)
                          return (
                            <React.Fragment key={`dml-${k}-${itemIdx}`}>
                              <DropdownMenuItem
                                onSelect={(event) => handleSelect(event, item)}
                                textValue={item.title}
                              >
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
                            // @todo(complexity) 12
                            // eslint-disable-next-line complexity
                            items.map((item, itemIdx) => {
                              // console.dir(`item:`)
                              // console.dir(item)
                              /**
                               * @hack until this is all dynamic
                               */
                              if (item.id === 'settings-theme') {
                                const icon = item.icons[theme]
                                return (
                                  <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                    <DropdownMenuItem
                                      onSelect={(event) => handleSelect(event, item)}
                                      textValue={item.title}
                                    >
                                      <Flex align="center" justify="start" gap="2">
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
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
                              }
                              if (item.id === 'settings-audio') {
                                const icon = item.icons[audio]
                                return (
                                  <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                    <DropdownMenuItem
                                      onSelect={(event) => handleSelect(event, item)}
                                      textValue={item.title}
                                    >
                                      <Flex align="center" justify="start" gap="2">
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
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
                              }
                              return (
                                <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                  <DropdownMenuItem
                                    onSelect={(event) => handleSelect(event, item)}
                                    textValue={item.title}
                                  >
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
